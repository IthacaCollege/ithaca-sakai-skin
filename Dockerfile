FROM maven:3.2-jdk-8 AS build  
# Build instructions: https://confluence.sakaiproject.org/pages/viewpage.action?pageId=107906475#Sakai12installguide(source)-1.0Createasakai.propertiesfilesakai-config

# Example: docker run --rm -v $PWD:/app -v $PWD/maven/ref/repository:/usr/share/maven/ref/repository -w /app maven:3.2-jdk-8 mvn -Dmaven.test.skip=true -Dmaven.tomcat.home=/app/build clean install

RUN git clone https://github.com/sakaiproject/sakai.git /app \
  && cd /app \
  && git checkout 12.x \
  && mkdir -p /build/sakai /usr/share/maven/ref/repository
WORKDIR /app
VOLUME /usr/share/maven/ref/repository
RUN mvn -Dmaven.test.skip=true -Dmaven.tomcat.home=/build -Dsakai.home=/build/sakai -Djava.net.preferIPv4Stack=true clean install

#FROM tomcat:8
#COPY --from=build /build/lib/* /usr/local/tomcat/lib/
