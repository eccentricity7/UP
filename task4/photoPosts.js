var photoPost = (function() {
    var photoPosts = [
        {
            id: '1',
            description: 'People who cannot bear to be alone are generally the worst company.',
            createdAt: new Date('2018-01-23T23:00:00'),
            author: 'Bob',
            photoLink: '../img/photo_1.jpg',
            tags: ['#kek', '#lol', '#instagood']
        },
        {
            id: '2',
            description: 'The best part about being alone is that you really don\'t have to answer to anybody. You do what you want.',
            createdAt: new Date('2018-02-23T23:00:00'),
            author: 'Petya',
            photoLink: '../img/photo_2.jpg',
            tags: ['#kek', '#lol', '#instalike']
        },
        {
            id: '3',
            description: 'Alone we can do so little; together we can do so much.',
            createdAt: new Date('2018-03-23T23:00:00'),
            author: 'Ilon',
            photoLink: '../img/photo_3.jpg',
            tags: ['#kek', '#lol', '#iou']
        },
        {
            id: '4',
            description: 'Look at the sky. We are not alone. The whole universe is friendly to us and conspires only to give the best to those who dream and work.',
            createdAt: new Date('2018-04-23T23:00:00'),
            author: 'Mask',
            photoLink: '../img/photo_4.jpg',
            tags: ['#kek', '#lol', '#blah-blah-blah']
        },
        {
            id: '5',
            description: 'It is better to be alone than in bad company.',
            createdAt: new Date('2018-05-23T23:00:00'),
            author: 'Sid',
            photoLink: '../img/photo_5.jpg',
            tags: ['#kek', '#lol', '#hello']
        },
        {
            id: '6',
            description: 'What a lovely surprise to finally discover how unlonely being alone can be.',
            createdAt: new Date('2018-06-23T23:00:00'),
            author: 'Nency',
            photoLink: '../img/photo_6.jpg',
            tags: ['#kek', '#lol', '#goodmorning']
        },
        {
            id: '7',
            description: 'I don\'t want to be alone, I want to be left alone.',
            createdAt: new Date('2018-07-23T23:00:00'),
            author: 'Afton',
            photoLink: '../img/photo_7.jpg',
            tags: ['#kek', '#lol', '#avesome']
        },
        {
            id: '8',
            description: 'Sometimes life is too hard to be alone, and sometimes life is too good to be alone.',
            createdAt: new Date('2018-08-23T23:00:00'),
            author: 'Kim',
            photoLink: '../img/photo_8.jpg',
            tags: ['#kek', '#lol', '#nup-nup']
        },
        {
            id: '9',
            description: 'And if you couldn\'t be loved, the next best thing was to be let alone.',
            createdAt: new Date('2018-09-23T23:00:00'),
            author: 'Alex',
            photoLink: '../img/photo_9.jpg',
            tags: ['#kek', '#lol', '#relax']
        },
        {
            id: '10',
            description: 'Nothing can bring you peace but yourself.',
            createdAt: new Date('2018-10-23T23:00:00'),
            author: 'Gilbert',
            photoLink: '../img/photo_10.jpg',
            tags: ['#kek', '#lol', '#birthday']
        },
        {
            id: '11',
            description: 'I love to be alone. I never found the companion that was so companionable as solitude.',
            createdAt: new Date('2018-11-23T23:00:00'),
            author: 'FastnFury',
            photoLink: '../img/photo_11.jpg',
            tags: ['#kek', '#lol', '#alone']
        },
        {
            id: '12',
            description: 'It is far better to be alone than to wish you were.',
            createdAt: new Date('2018-12-23T23:00:00'),
            author: 'Scott',
            photoLink: '../img/photo_12.jpg',
            tags: ['#kek', '#lol', '#good-by']
        },
        {
            id: '13',
            description: 'All of our unhappiness comes from our inability to be alone.',
            createdAt: new Date('2018-00-23T23:00:00'),
            author: 'Keb',
            photoLink: '../img/photo_13.jpg',
            tags: ['#kek', '#lol', '#ground']
        },
        {
            id: '14',
            description: 'Be able to be alone. Lose not the advantage of solitude, and the society of thyself.',
            createdAt: new Date('2018-01-23T23:00:00'),
            author: 'Kock',
            photoLink: '../img/photo_14.jpg',
            tags: ['#kek', '#lol', '#swampy']
        },
        {
            id: '15',
            description: 'Strive for greatness.',
            createdAt: new Date('2018-02-23T23:00:00'),
            author: 'Piter',
            photoLink: '../img/photo_15.jpg',
            tags: ['#kek', '#lol', '#plain']
        },
        {
            id: '16',
            description: 'Don\'t let today\'s disappointments cast a shadow on tomorrow\'s dreams.',
            createdAt: new Date('2018-03-23T23:00:00'),
            author: 'Parker',
            photoLink: '../img/photo_16.jpg',
            tags: ['#kek', '#lol', '#goods']
        }, {
            id: '17',
            description: 'When words fail, music speaks. ',
            createdAt: new Date('2018-04-23T23:00:00'),
            author: 'Stone',
            photoLink: '../img/photo_17.jpg',
            tags: ['#kek', '#lol', '#ohmygod']
        },
        {
            id: '18',
            description: 'One\'s best success comes after their greatest disappointments.',
            createdAt: new Date('2018-05-23T23:00:00'),
            author: 'Wild',
            photoLink: '../img/photo_18.jpg',
            tags: ['#kek', '#lol', '#error']
        },
        {
            id: '19',
            description: 'Sometimes when you get disappointment it makes you stronger.',
            createdAt: new Date('2018-06-23T23:00:00'),
            author: 'Nick',
            photoLink: '../img/photo_19.jpg',
            tags: ['#kek', '#lol', '#babie']
        },
        {
            id: '20',
            description: 'Disappointments are to the soul what a thunderstorm is to the air.',
            createdAt: new Date('2018-07-23T23:00:00'),
            author: 'Kant',
            photoLink: '../img/photo_20.jpg',
            tags: ['#kek', '#lol', '#someone']
        }
    ];

    function compareDates(a, b) {
        return a.createdAt - b.createdAt;
    }

    function getPhotoPosts(skip, top, filterConfig) {
        if (filterConfig.author)
            result = photoPosts.filter(function (a) {
                return a.author == filterConfig.author;
            });
        if (filterConfig.createdAt)
            result = photoPosts.filter(function (a) {
                return a.createdAt.getTime() == filterConfig.createdAt.getTime();
            });
        result.sort(compareDates);
        return result.slice(skip, skip + top);
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
            return false
        return post.author.length != 0 && post.photoLink.length != 0;
    }

    function addPhotoPost(photoPost) {
        if (validatePhotoPost(photoPost)) {
            photoPosts.push(photoPost)
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

    return {
        photoPosts: function () {
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