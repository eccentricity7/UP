var photoPost = (function () {
    var photoPosts = [
        {
            id: '1',
            description: 'People who cannot bear to be alone are generally the worst company.',
            createdAt: new Date('2018-01-23'),
            author: 'Bob',
            photoLink: 'img/photo_1.jpg',
            tags: ['#lol', '#instagood'],
            like: 1
        },
        {
            id: '2',
            description: 'The best part about being alone is that you really don\'t have to answer to anybody. You do what you want.',
            createdAt: new Date('2018-02-23'),
            author: 'Petya',
            photoLink: 'img/photo_2.jpg',
            tags: ['#lol', '#instalike'],
            like: 1
        },
        {
            id: '3',
            description: 'Alone we can do so little; together we can do so much.',
            createdAt: new Date('2018-03-23'),
            author: 'Ilon',
            photoLink: 'img/photo_3.jpg',
            tags: ['#lol', '#iou'],
            like: 1
        },
        {
            id: '4',
            description: 'Look at the sky. We are not alone. The whole universe is friendly to us and conspires only to give the best to those who dream and work.',
            createdAt: new Date('2018-04-23'),
            author: 'Mask',
            photoLink: 'img/photo_4.jpg',
            tags: ['#lol', '#blah-blah-blah'],
            like: 1
        },
        {
            id: '5',
            description: 'It is better to be alone than in bad company.',
            createdAt: new Date('2018-05-23'),
            author: 'Sid',
            photoLink: 'img/photo_5.jpg',
            tags: ['#lol', '#hello'],
            like: 1
        },
        {
            id: '6',
            description: 'What a lovely surprise to finally discover how unlonely being alone can be.',
            createdAt: new Date('2018-05-23'),
            author: 'Nency',
            photoLink: 'img/photo_6.jpg',
            tags: ['#lol', '#goodmorning'],
            like: 1
        },
        {
            id: '7',
            description: 'I don\'t want to be alone, I want to be left alone.',
            createdAt: new Date('2018-05-23'),
            author: 'Afton',
            photoLink: 'img/photo_7.jpg',
            tags: ['#lol', '#avesome'],
            like: 1
        },
        {
            id: '8',
            description: 'Sometimes life is too hard to be alone, and sometimes life is too good to be alone.',
            createdAt: new Date('2018-05-23'),
            author: 'Kim',
            photoLink: 'img/photo_8.jpg',
            tags: ['#lol', '#nup-nup'],
            like: 1
        },
        {
            id: '9',
            description: 'And if you couldn\'t be loved, the next best thing was to be let alone.',
            createdAt: new Date('2018-05-23'),
            author: 'Alex',
            photoLink: 'img/photo_9.jpg',
            tags: ['#lol', '#relax'],
            like: 1
        },
        {
            id: '10',
            description: 'Nothing can bring you peace but yourself.',
            createdAt: new Date('2018-05-23'),
            author: 'Gilbert',
            photoLink: 'img/photo_10.jpg',
            tags: ['#lol', '#birthday'],
            like: 1
        },
        {
            id: '11',
            description: 'I love to be alone. I never found the companion that was so companionable as solitude.',
            createdAt: new Date('2018-05-23'),
            author: 'FastnFury',
            photoLink: 'img/photo_11.jpg',
            tags: ['#kek', '#alone'],
            like: 1
        },
        {
            id: '12',
            description: 'It is far better to be alone than to wish you were.',
            createdAt: new Date('2018-05-23'),
            author: 'Scott',
            photoLink: 'img/photo_12.jpg',
            tags: ['#kek', '#good-by'],
            like: 1
        },
        {
            id: '13',
            description: 'All of our unhappiness comes from our inability to be alone.',
            createdAt: new Date('2018-05-23'),
            author: 'Keb',
            photoLink: 'img/photo_13.jpg',
            tags: ['#kek', '#ground'],
            like: 1
        },
        {
            id: '14',
            description: 'Be able to be alone. Lose not the advantage of solitude, and the society of thyself.',
            createdAt: new Date('2018-05-23'),
            author: 'Kock',
            photoLink: 'img/photo_14.jpg',
            tags: ['#kek', '#swampy'],
            like: 1
        },
        {
            id: '15',
            description: 'Strive for greatness.',
            createdAt: new Date('2018-05-23'),
            author: 'Piter',
            photoLink: 'img/photo_15.jpg',
            tags: ['#kek', '#plain'],
            like: 1
        },
        {
            id: '16',
            description: 'Don\'t let today\'s disappointments cast a shadow on tomorrow\'s dreams.',
            createdAt: new Date('2018-05-23'),
            author: 'Parker',
            photoLink: 'img/photo_16.jpg',
            tags: ['#kek', '#goods'],
            like: 1
        }, {
            id: '17',
            description: 'When words fail, music speaks. ',
            createdAt: new Date('2018-05-23'),
            author: 'Stone',
            photoLink: 'img/photo_17.jpg',
            tags: ['#kek', '#ohmygod'],
            like: 1
        },
        {
            id: '18',
            description: 'One\'s best success comes after their greatest disappointments.',
            createdAt: new Date('2018-05-23'),
            author: 'Wild',
            photoLink: 'img/photo_18.jpg',
            tags: ['#kek', '#error'],
            like: 1
        },
        {
            id: '19',
            description: 'Sometimes when you get disappointment it makes you stronger.',
            createdAt: new Date('2018-05-23'),
            author: 'Nick',
            photoLink: 'img/photo_19.jpg',
            tags: ['#kek', '#babie'],
            like: 1
        },
        {
            id: '20',
            description: 'Disappointments are to the soul what a thunderstorm is to the air.',
            createdAt: new Date('2018-05-23'),
            author: 'Kant',
            photoLink: 'img/photo_20.jpg',
            tags: ['#kek', '#someone'],
            like: 1
        },
        {
            id: '21',
            description: '213.',
            createdAt: new Date('2018-06-23'),
            author: 'Nick',
            photoLink: 'img/photo_19.jpg',
            tags: ['#kek'],
            like: 1
        },
    ];

    function compareDates(a, b) {
        return a.createdAt - b.createdAt;
    }

    function getPhotoPosts(skip = 0, top = 5, filterConfig) {
        var result = null;
        if (filterConfig.author != '' || filterConfig.createdAt != '' || filterConfig.tags.length != 0) {
            result = photoPosts;
            if (filterConfig.author)
                result = result.filter(function (a) {
                    return a.author.toUpperCase() == filterConfig.author.toUpperCase();
                });
            if (filterConfig.createdAt instanceof Date && isFinite(filterConfig.createdAt))
                result = result.filter(function (a) {
                    return a.createdAt.getTime() == filterConfig.createdAt.getTime();
                });
            if (filterConfig.tags.length != 0)
                result = result.filter(function (a) {
                    for (var i = 0; i < a.tags.length; i++) {
                        for (var j = 0; j < filterConfig.tags.length; j++) {
                            if (a.tags[i].toUpperCase() == filterConfig.tags[j].toUpperCase()) {
                                return true;
                            }
                        }
                    }
                    return false;
                });
            result.sort(compareDates);
            return result.slice(skip, skip + top);
        }
        return [];
    }

    function getPhotoPost(id) {
        return photoPosts.find(
            function (item, i, arr) {
                return item.id == id;
            }
        )
    }

    function validatePhotoPost(post) {
        if (!post.description || post.description.length >= 200)
            return false;
        if (!post.createdAt || !post.author || !post.photoLink)
            return false;
        return post.author.length != 0 && post.photoLink.length != 0;
    }

    function addPhotoPost(photoPost) {
        if (validatePhotoPost(photoPost)) {
            photoPosts.push(photoPost);
            photoPosts[photoPosts.length - 1].id = photoPosts.length;
            return true;
        }
        return false;
    }

    function removePhotoPost(id) {
        photoPosts.splice(photoPosts.indexOf(getPhotoPost(id)), 1);
    }

    function editPhotoPost(id, photoPost) {
        post = getPhotoPost(id);
        photoPost.createdAt = post.createdAt;
        photoPost.author = post.author;
        photoPost.id = post.id;
        if (validatePhotoPost(photoPost)) {
            post.description = photoPost.description;
            post.photoLink = photoPost.photoLink;
            post.tags = photoPost.tags;
            return true;
        }
        return false;
    }

    function incrementlike(id) {
        return ++getPhotoPost(id).like;
    }

    function decrementlike(id) {
        return --getPhotoPost(id).like;
    }

    return {
        incrementlike: function(id) {
            return incrementlike(id);
        },
        decrementlike: function(id) {
            return decrementlike(id);
        },
        photoPosts: function () {
            return photoPosts;
        },
        compareDates: function (a, b) {
            return compareDates(a, b);
        },
        getPhotoPosts: function (skip, top, filterConfig) {
            return getPhotoPosts(skip, top, filterConfig);
        },
        getPhotoPost: function (id) {
            return getPhotoPost(id);
        },
        validatePhotoPost: function (post) {
            return validatePhotoPost(post);
        },
        addPhotoPost: function (photoPost) {
            return addPhotoPost(photoPost);
        },
        removePhotoPost: function (id) {
            return removePhotoPost(id);
        },
        editPhotoPost: function (id, photoPost) {
            return editPhotoPost(id, photoPost);
        }
    }
})();