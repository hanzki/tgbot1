#!/bin/bash
pwd
zip output.zip ./*
aws s3 cp output.zip s3://hannu-lambdafunctions/output.zip
