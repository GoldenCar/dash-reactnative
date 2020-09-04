# Dash App native app client

### How to set up local dev environment
1. Clone the repo
2. Install rvm
3. install cocoapods
4. brew update
5. brew install watchman
6. cd into ios
7. pod install
8. click on/open the .xcworkspace file
9. click dash and click the play button


Note that to use apple sign in you'll have to run the app on an iOS device instead of the simulator. The following steps (as well as a paid apple developer account) are required to set that up

1. Install fastlane https://docs.fastlane.tools/getting-started/ios/setup/
2. You may need to update fastlane via `sudo gem install fastlane`
3. If that gives you perms/sudo issues, go to your `.zshrc` and add the following:
 ```
 # fastlane
export GEM_HOME=~/.gems
export PATH=$PATH:~/.gems/bin
```
4. Open another terminal window 
5. run `mkdir $GEM_HOME`
6. Run `fastlane certificates` from the project root
7. If there are auth problems with github running this, run `git config --global --add url."git@github.com:".insteadOf "https://github.com/"
` and try again - more info at https://jacopretorius.net/2018/05/git-error-could-not-read-username.html 
