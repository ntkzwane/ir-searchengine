SRC = ./src/

all: contents

install: $(SRC)
	@mkdir solr
	@wget http://apache.saix.net/lucene/solr/5.1.0/solr-5.1.0.zip
	@unzip solr-5.1.0.zip -dq solr
	@rm solr-5.1.0.zip

contents: install
	@cp $(SRC)* ./solr/server/solr-webapp/webapp/
