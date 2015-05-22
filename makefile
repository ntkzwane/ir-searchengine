SOLR = ./bin/solr
SOLR_POST = ./bin/post
CORPUS = 

all:

restart: stop start 
	echo "RESTARTING"

start:
	$(SOLR) start -c
	
stop:
	$(SOLR) stop -all

post:
	$(SOLR_POST) -c $(CORPUS)

