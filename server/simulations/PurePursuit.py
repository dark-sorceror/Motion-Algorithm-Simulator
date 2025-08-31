import math
import numpy as np

from WaypointGeneration import generateWayPath

path = [(0, 0, 0), (1, 0, 90), (2, 0, 90), (6, 3, 45)]

def getEuclideanDistance(p1, p2):
    return math.sqrt((p2[0] - p1[0])**2 + (p2[1] - p1[1])**2)

def getDistances(path):
    distances = [0.0]
    
    for i in range(1, len(path)):
        dist = getEuclideanDistance(path[i - 1], path[i])
        distances.append(distances[-1] + dist)
    
    return distances

def curvatureFromPoints(p1, p2, p3):
    v1 = np.array(p2) - np.array(p1)
    v2 = np.array(p3) - np.array(p2)

    if np.cross(v1, v2) == 0:
        return 0.0

    # 2 * Area / (|v1| * |v2| * |v1 + v2|)
    curvature = 2 * abs(np.cross(v1, v2)) / (np.linalg.norm(v1) * np.linalg.norm(v2) * np.linalg.norm(v1 + v2))
    return curvature

def find_closest_point(robot_position, path):
    robot_x, robot_y, robot_theta = robot_position

    min_distance = float('inf')
    closest_point = None
    closest_index = -1

    for i, point in enumerate(path):
        dx = point[0] - robot_x
        dy = point[1] - robot_y

        ahead_check = np.dot([np.cos(robot_theta), np.sin(robot_theta)], [dx, dy])
        
        if ahead_check > 0:
            distance = np.linalg.norm([dx, dy])
            if distance < min_distance:
                min_distance = distance
                closest_point = point
                closest_index = i
                
    return closest_point, closest_index

def find_lookahead_point(robot_position, closest_point, lookahead_distance, path):
    robot_x, robot_y, robot_theta = robot_position

    min_distance_to_lookahead = float('inf')
    lookahead_point = None

    for i in range(len(path)):
        index = (np.argmax(path[:, 0] > closest_point[0]) + i) % len(path)
        point = path[index]
        distance = np.linalg.norm(point - np.array([robot_x,robot_y]))
        
        dx = point[0] - robot_x
        dy = point[1] - robot_y
        ahead_check = np.dot([np.cos(robot_theta), np.sin(robot_theta)], [dx, dy])
        if ahead_check > 0 and distance > lookahead_distance:
            if np.abs(distance - lookahead_distance) < min_distance_to_lookahead:
                min_distance_to_lookahead = np.abs(distance - lookahead_distance)
                lookahead_point = point
    return lookahead_point

def calculate_target_velocities_curvature(path, max_velocity, curvature_threshold=0.5, safety_factor=0.8):
    target_velocities = np.zeros(len(path))
    for i, (x, y, curvature) in enumerate(path):
        if curvature > curvature_threshold:
            target_velocities[i] = max_velocity * (1 - (curvature - curvature_threshold) / curvature_threshold) * safety_factor
        else:
            target_velocities[i] = max_velocity
    return target_velocities