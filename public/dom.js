var dom = (function () {
    var user = null;
    var amountLoadedPosts = 0;
    var numberPostsToLoad = 2;
    var nonAuthorisedHeaderSelector = "#non-authorised";
    var authorisedHeaderSelector = "#authorised";
    var parentHeaderSelector = "#header-parent";
    var parentPostSelector = '#post-parent';
    var filterConfig = null;
    var isInit = false;
    var postToEditId = null;

    function setUser(username) {
        user = username;
    }

    function init() {
        clearData(parentPostSelector);

        for (var i = 0; i < numberPostsToLoad; i++) {
            showPost(i + 1, parentPostSelector);
        }
        if (!document.getElementById('button'))
            insertFirstTemplate('#button-template', '#parent-button', document);
        addEventListenersIndex();
        isInit = true;
    }

    function addEventListenersIndex() {
        document.querySelector('#find-submit').addEventListener('click', onSearch);
        document.querySelector('#button').addEventListener('click', loadPosts);
        if (user !== 'null') {
            document.querySelector('#log-out').addEventListener('click', logOut);
            document.querySelector('#add-photo').addEventListener('click', onEditPost);
        }
    }

    function addEventListenersAuthorisation() {
        document.querySelector('#submit-authorisation').addEventListener('click', validateAuthorisation);
        document.querySelector('#nickname').addEventListener('keydown', enterPrevent);
        document.querySelector('#password').addEventListener('keydown', submitForm);
    }

    function addEventListenersError() {
        document.addEventListener('keydown', submitDownError);
        document.querySelector('#error-anchor').addEventListener('click', submitDownError);
    }

    function onEditPost(event) {
        clearData(parentPostSelector);
        insertFirstTemplate('#post-add-template', parentPostSelector, document);
        document.querySelector('#edit-post-button').addEventListener('click', onClickAddPost);
        var postDate = new Date();

        document.getElementById('edit-post-date').innerText = postDate.toLocaleString().substr(0, 10);
        document.getElementById('edit-post-name').innerText = user;
    }

    function serialiseUser(nickname) {
        localStorage.setItem('user', nickname);
    }

    function deserialise(event) {
        if (window.location.pathname === '/static/index.html') {
            var deserialisedPostString = localStorage.getItem('posts');
            user = localStorage.getItem('user');
            if (!isInit && user !== 'null') {
                insertFirstTemplate(authorisedHeaderSelector, parentHeaderSelector, document);
                document.querySelector('#nickname').innerText = user;
            } else if (!isInit) {
                insertFirstTemplate(nonAuthorisedHeaderSelector, parentHeaderSelector, document);
            }

            if (deserialisedPostString == '[]') {
                init();
            } else {
                if (!document.getElementById('button'))
                    insertFirstTemplate('#button-template', '#parent-button', document);
                    addEventListenersIndex();
                var posts = JSON.parse(deserialisedPostString);
                posts.forEach(element => {
                    showPost(element.id);
                });
            }
        }
        dom.init();

    }

    function serialise(e) {
        if (window.location.pathname === '/static/index.html') {
            localStorage.setItem('posts', JSON.stringify(getPostsOnPage()));
            localStorage.setItem('user', user);
        }
    }

    function getPostsOnPage() {
        var posts = document.querySelector(parentPostSelector).children;
        var postsToSerialise = [];
        for (var i = 0; i < posts.length; i++) {
            postsToSerialise.push(photoPost.getPhotoPost(posts[i].id));
        }
        return postsToSerialise;
    }

    function onClickRemovePost(event) {
        var postToRemove = this.parentNode.parentNode.parentNode.parentNode;
        photoPost.removePhotoPost(postToRemove.id);
        postToRemove.remove();
    }

    function onClickEditPost(event) {
        postToEditId = this.parentNode.parentNode.parentNode.parentNode.id;
        clearData(parentPostSelector);
        insertFirstTemplate('#post-add-template', parentPostSelector, document);
        document.querySelector('#edit-post-button > div').innerText = 'edit';
        document.querySelector('#edit-post-button').addEventListener('click', onClickChangePostButton);

        var postDate = new Date();

        document.getElementById('edit-post-date').innerText = postDate.toLocaleString().substr(0, 10);
        document.getElementById('edit-post-name').innerText = user;

        var description = photoPost.getPhotoPost(postToEditId).description;
        photoPost.getPhotoPost(postToEditId).tags.forEach(function (tag) {
            description += ' ' + tag;
        });
        document.getElementById('edit-post-description').value = description;
    }

    function onClickChangePostButton(event) {
        var post = {
            description: document.getElementById('edit-post-description').value,
            createdAt: new Date(),
            author: user,
            photoLink: getGoodPath(document.getElementById('edit-post-photo').value),
            tags: parseTags(document.getElementById('edit-post-description').value),
            like: 0
        }
        photoPost.editPhotoPost(postToEditId, post);
        init();
    }

    function onClickAddPost(event) {
        var post = {
            id: null,
            description: filterDescription(document.getElementById('edit-post-description').value),
            createdAt: new Date(),
            author: user,
            photoLink: getGoodPath(document.getElementById('edit-post-photo').value),
            tags: parseTags(document.getElementById('edit-post-description').value),
            like: 0
        }
        photoPost.addPhotoPost(post);
        init();
    }

    function filterDescription(string) {
        var resultArray = string.split(' ').filter(function (a) {
            return a != '' && a[0] != '#';
        });
        var result = '';
        resultArray.forEach(function (word) {
            result += ' ' + word;
        });
        return result;
    }

    function getGoodPath(stringPath) {
        return 'img/' + stringPath.substring(12);
    }

    function parseTags(stringToParse) {
        var result = [];
        stringToParse.split(' ').filter(function (a) {
            return a != '';
        }).forEach(function (word) {
            if (word[0] === '#') {
                result.push(word);
            }
        });
        return result;
    }

    function logOut(event) {
        setUser(null);
        location.reload();
    }

    function enterPrevent(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById('password').focus();
        }
    }
    function submitForm(event) {
        if (event.key === "Enter") {
            document.getElementById('submit-authorisation').click();
            event.preventDefault();
        }
    }

    function submitDownError(event) {
        if (event.key === "Enter" || (event.type === 'click' && event.target.id == "error-anchor")) {
            document.location.href = 'index.html';
        }
    }

    function insertFirstTemplate(templateSelector, parentSelector, searchNode) {
        var templateContent = searchNode.querySelector(templateSelector).content.cloneNode(true);
        var parentNode = searchNode.querySelector(parentSelector);
        parentNode.insertBefore(templateContent, parentNode.firstChild);
    }

    function showPost(id) {
        amountLoadedPosts++;
        var currentPostData = photoPost.getPhotoPost(id);
        var currentPostNode = document.querySelector("#post").content.cloneNode(true);

        currentPostNode.querySelector('#post-description').innerText = currentPostData.description;
        currentPostNode.querySelector('#post-author').innerText = currentPostData.author;
        currentPostNode.querySelector('#post-date').innerText = currentPostData.createdAt.toLocaleString().substr(0, 10);
        currentPostNode.querySelector('#post-image').innerText = currentPostData.photoLink;
        currentPostNode.querySelector('#post-like').innerText = currentPostData.like;
        currentPostNode.querySelector('#post-image').setAttribute('src', currentPostData.photoLink);
        currentPostNode.firstElementChild.id = id;
        var parentTags = currentPostNode.querySelector('#post-hashtags');
        for (var i = 0; i < currentPostData.tags.length; i++) {
            var hashtag = document.createElement('div');
            hashtag.innerText = currentPostData.tags[i];
            parentTags.appendChild(hashtag);
        }

        if (user == currentPostData.author) {
            insertFirstTemplate("#post-edit", "#edit-parent", currentPostNode);
            currentPostNode.getElementById('trash').addEventListener('click', onClickRemovePost);
            currentPostNode.getElementById('pencil').addEventListener('click', onClickEditPost);
            currentPostNode.getElementById('panel-like').addEventListener('click', onClickLike);
        }
        document.querySelector(parentPostSelector).appendChild(currentPostNode);
    }

    function addPost(post) {
        if (user && photoPost.addPhotoPost(post)) {
            showPost(post.id, parentPostSelector);
        } else {
            document.location.href = 'error.html';
        }
    }

    function onSearch(event) {
        var searchString = document.querySelector('#find').value.split(' ').filter(function (a) {
            return a != '';
        });
        filterConfig = {
            tags: [],
            author: '',
            createdAt: new Date(document.querySelector('#date').value)
        }
        searchString.forEach(element => {
            if (element[0] == '#') {
                filterConfig.tags.push(element);
            } else {
                filterConfig.author = element;
            }
        });
        amountLoadedPosts = 0;
        clearData(parentPostSelector);
        loadPosts();
    }

    function loadPosts() {
        var posts = null;
        if (filterConfig) {
            posts = photoPost.getPhotoPosts(amountLoadedPosts, numberPostsToLoad, filterConfig);
        } else {
            posts = photoPost.photoPosts().slice(amountLoadedPosts, amountLoadedPosts + numberPostsToLoad);
        }
        if (posts.length != 0) {
            for (var i = 0; i < posts.length; i++) {
                showPost(posts[i].id);
            }
        } else {
            alert("There are no more photos");
        }
    }

    function clearData(parentSelector) {
        var a = document.querySelector(parentSelector);
        document.querySelector(parentSelector).innerHTML = '';
    }

    function validateAuthorisation(event) {
        var inputNickname = document.querySelector('#nickname');
        var inputPassword = document.querySelector('#password');

        if (validateNickname(inputNickname.value)) {
            serialiseUser(inputNickname.value);
            document.location.href = 'index.html';
        } else {
            document.location.href = 'error.html';
        }
    }

    function validateNickname(nickname) {
        for (var i = 1; i <= photoPost.photoPosts().length; i++) {
            if (photoPost.getPhotoPost(i).author == nickname) {
                return true;
            }
        }
        return false;
    }
    var likedPosts = [];
    function onClickLike(event) {
        postToLikeId = this.parentNode.parentNode.parentNode.id;
        if (!likedPosts.includes(postToLikeId)) {
            document.getElementById('post-like').innerText = photoPost.incrementlike(postToLikeId);
            likedPosts.push(postToLikeId);
        } else {
            document.getElementById('post-like').innerText = photoPost.decrementlike(postToLikeId);
            likedPosts.splice(likedPosts.indexOf(postToLikeId), 1);
        }
    }

    document.addEventListener('DOMContentLoaded', deserialise);
    window.addEventListener('beforeunload', serialise);

    return {
        showPost: function (id) {
            showPost(id);
        },
        init: function (user, nonAuthorisedHeaderSelector, authorisedHeaderSelector, parentHeaderSelector, parentPostSelector) {
            init(user, nonAuthorisedHeaderSelector, authorisedHeaderSelector, parentHeaderSelector, parentPostSelector);
        },
        addPost: function (post) {
            addPost(post);
        },
        addEventListenersAuthorisation: function () {
            addEventListenersAuthorisation();
        },
        addEventListenersError: function () {
            addEventListenersError();
        },
        setUser: function (username) {
            setUser(username);
        }
    }
})();