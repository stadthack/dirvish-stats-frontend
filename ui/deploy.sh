#!/bin/bash

rm -r ../../dirvish_server/dirvishserver/static/*
rm -r ../../dirvish_server/dirvishserver/static/.ht*
./node_modules/grunt-cli/bin/grunt deploy
