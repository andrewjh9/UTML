#!/bin/sh
cd client
sudo Tnpm run ng -p build
cd ..
cp -r client/dist/client/. src/main/resources/static
