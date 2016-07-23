#!/bin/bash

PYTHON_INTERPRETER_PATH="$(which python)"

echo -e "[localhost]\n127.0.0.1 ansible_python_interpreter=$PYTHON_INTERPRETER_PATH" > hosts
