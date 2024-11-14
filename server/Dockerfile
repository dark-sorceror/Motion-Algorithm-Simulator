FROM python:3.10

WORKDIR /app

COPY requirements.txt /app/
RUN pip install -r requirements.txt

COPY . /app

EXPOSE 5001

CMD ["python3", "wsg.py"]