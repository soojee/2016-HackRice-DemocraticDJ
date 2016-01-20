Democratic DJ
==========
Source code for the Democratic DJ web application created for HackRice 2016.

##Overview

###Code Overview
* Front-end primarily implemented in HTML, CSS, AngularJS
* Back-end implemented using Node.js, Express, MongoDB

##About
When music meets freedom! Democratic DJ is a fun and interactive web application to remedy group situations in which no one can reach a consensus on what to listen to.

###How to Use
**For party hosts**
* Click host and log in with Spotify to create a room for your cool partay
* Tell your friends that you trust them with the ability to contribute their music taste to the playlist like the good friend that you are
* Add songs if you would like
* Save playlist after party if you groove with it
* End session to leave room

**For friends attending host's party**
* Click friend and join host's room
* Do the party atmosphere a favor and grace it with your fantastic music taste
* Upvote songs to bump songs higher on the playlist queue
* Save playlist after party if you groove with it

##Libraries
Built with the help of these frameworks:
* [AngularJS](https://angularjs.org/)
* [Bootstrap](http://getbootstrap.com/)

With the help of these AngularJS directives:
* [Angular-UI](https://angular-ui.github.io/bootstrap/)

With the help of these tools:
* [Mongoose](http://mongodb-tools.com/tool/mongoose/)
* [Font Awesome](https://fortawesome.github.io/Font-Awesome/)

Data taken from the following APIs:
* [Spotify API](http://spotify.com)


##To-dos
* Remove " undefined by undefined" after typeahead result is selected.
* sorting of search results upon typeahead query. Currently results aren't ordered by rank of song.
* clean up interface of queue… extra info about artist etc
* single vote only. (UX - people shouldn't be allowed to skew the votes)

License
--------

    Copyright 2016 Benjamin Lee, Caroline Shi, Joshua Pham, Scott Huang, Soojee Chung.

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
