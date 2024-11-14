FROM python:3.10

WORKDIR /app

COPY ./server /app

RUN pip install -r /app/requirements.txt

EXPOSE 5001

CMD ["python3", "wsg.py"]