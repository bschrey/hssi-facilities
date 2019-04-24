FROM node:10.9.0

ENV PORT=5000 
ENV MONGODB_URI=mongodb://hssi-db:27017/facility 
ENV DEBUG=notes:*
 
RUN mkdir -p /facility

COPY package.json *.js /facility/
COPY controllers/ /facility/controllers/
COPY models/ /facility/models/
COPY db/ /facility/db/
COPY routes/ /facility/routes/

WORKDIR /facility

RUN printf "deb http://archive.debian.org/debian/ jessie main\ndeb-src http://archive.debian.org/debian/ jessie main\ndeb http://security.debian.org jessie/updates main\ndeb-src http://security.debian.org jessie/updates main" > /etc/apt/sources.list

RUN apt-get update -y  \
    && apt-get -y install curl python build-essential git ca-certificates  \
    && npm install --unsafe-perm
 
EXPOSE 5000 

CMD npm run docker 
