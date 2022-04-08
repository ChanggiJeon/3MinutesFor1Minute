# FROM continuumio/miniconda3
FROM python:3
ENV PYTHONUNBUFFERED 1

RUN apt-get update
RUN apt-get install default-libmysqlclient-dev -y
RUN apt-get -y install gcc
RUN apt-get install gcc g++ -y
RUN apt install default-jdk -y

ARG DEBUG
ARG SECRET_KEY
ARG ALLOWED_HOSTS
ARG CORS_ORIGIN_WHITELIST
ARG DATABASE_NAME
ARG DATABASE_USER
ARG DATABASE_PASS
ARG DATABASE_HOST
ARG DATABASE_PORT

ENV DEBUG $DEBUG
ENV SECRET_KEY $SECRET_KEY
ENV ALLOWED_HOSTS $ALLOWED_HOSTS
ENV CORS_ORIGIN_WHITELIST $CORS_ORIGIN_WHITELIST
ENV DATABASE_NAME $DATABASE_NAME
ENV DATABASE_USER $DATABASE_USER
ENV DATABASE_PASS $DATABASE_PASS
ENV DATABASE_HOST $DATABASE_HOST
ENV DATABASE_PORT $DATABASE_PORT

RUN mkdir /backend
WORKDIR /backend
COPY ./ ./
# RUN conda env create -f tmp.yml
# RUN echo "conda activate ai" >> ~/.bashrc
# ENV PATH /opt/conda/envs/nenv/bin:$PATH
# RUN echo "source activate ai" >> ~/.bashrc
# RUN pip install --upgrade pip
# RUN pip install --upgrade setuptools
RUN pip install gunicorn
RUN pip install -r requirements.txt