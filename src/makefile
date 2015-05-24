SOLR = ../../bin/solr
SOLR_POST = ../../bin/post
CORPUS = ./corpus/


restart: | stop | post 
	echo "RESTARTING"

start:
	$(SOLR) start -c

create: | start
	$(SOLR) create -c swali
	
stop: | delete
	$(SOLR) stop -all

delete:
	$(SOLR) delete -c swali

post: | create
	$(SOLR_POST) -c swali $(CORPUS)

