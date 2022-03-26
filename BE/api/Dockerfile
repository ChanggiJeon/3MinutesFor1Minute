FROM continuumio/miniconda3
ENV PYTHONUNBUFFERED 1
RUN apt-get update
RUN apt-get install default-libmysqlclient-dev -y
RUN apt-get -y install gcc
ARG DEBUG
ARG SECRET_KEY
ARG ALLOWED_HOSTS
ARG DATABASE_NAME
ARG DATABASE_USER
ARG DATABASE_PASS
ARG DATABASE_HOST
ENV DATABASE_PORT $DATABASE_PORT
ENV ALLOWED_HOSTS $ALLOWED_HOSTS
ENV DATABASE_NAME $DATABASE_NAME
ENV DATABASE_USER $DATABASE_USER
ENV DATABASE_PASS $DATABASE_PASS
ENV DATABASE_HOST $DATABASE_HOST
ENV DATABASE_PORT $DATABASE_PORT
RUN mkdir /backend
WORKDIR /backend
COPY ./ ./
RUN conda env create -f tmp.yml
RUN echo "source activate ai" > ~/.bashrc
ENV PATH /opt/conda/envs/nenv/bin:$PATH
RUN pip install --upgrade pip
RUN pip install --upgrade setuptools
RUN pip install gunicorn
RUN pip install -r tmp.txt