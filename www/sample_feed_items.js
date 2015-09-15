(function(){
  var getFeedWordList, getFeedReadingList, getFillBlankSentencesWithCategories, getWordCategories, getFeedVideoLists, getPosterLists, all_feed_items_cache, getAllFeedItems, feed_items_cache, getSampleFeedItems, out$ = typeof exports != 'undefined' && exports || this;
  out$.getFeedWordList = getFeedWordList = function(){
    return ['cat', 'dog', 'white', 'black', 'blue', 'red', 'bee', 'bird', 'lion', 'tiger', 'fish', 'city', 'house', 'roof', 'tree', 'river', 'apple', 'banana', 'cherry', 'orange', 'pear'];
  };
  out$.getFeedReadingList = getFeedReadingList = function(){
    return [['Why do elephants never forget?', 'Because nobody ever tells them anything!'], ['What do you get when you cross a parrot with a centipede?', 'A walkie talkie!'], ['What is the strongest animal?', 'A snail. He carries his house on his back!'], ['What has six eyes but cannot see?', 'Three blind mice!']];
  };
  out$.getFillBlankSentencesWithCategories = getFillBlankSentencesWithCategories = function(){
    return [['My favorite color is ________.', 'color'], ['My favorite animal is the ________.', 'animal'], ['My favorite fruit is the ________.', 'fruit']];
  };
  out$.getWordCategories = getWordCategories = function(){
    return {
      'color': ['red', 'blue', 'black', 'white'],
      'animal': ['cat', 'dog', 'bee', 'bird', 'lion', 'tiger', 'fish'],
      'fruit': ['apple', 'banana', 'cherry', 'orange', 'pear']
    };
  };
  out$.getFeedVideoLists = getFeedVideoLists = function(){
    return {
      lettervideo: ['y8pZ3F8KB_Y', 'F7WyPqms5x0', 'LnDxp5QNxmA', 'qdJwtaaTfb4', 'PMDpfPky054', 'CaywS_FK4wE', 'O96r1dZ4Nqg', 'ndf_-FJsPVk', 'yZbNMjwgEN8', 'GkcqRmdwKlE', 'DHRQXGTSvw0', 'YASqLUId4n8', 'xUOc-UwTVBA', 'LYyK7KurvMs', 'rpvtKnqu7-4', '3724uXedg0A', '-k4oiVaekT0', 'zQ7vvPa4pAk', 'McACiO5dwGM', '4PhbUhrI4KE', 'qmWTMNhtY9Q', 'NkniyCUWeF4', '8ovG9ptOjBw', 'RhA10WVTmHw', 'RJH2oMKPeaw', 'f-iL7k5jhCI'],
      numbervideo: ['pbRU3lsGS0M', 'IiwqgDfJyXQ', 'VW2MREqE-_I', 'eyi0179wpE0', 'dpMP78dU5gQ', 'aKZlJ-tZo1Y', 'sXhM7AfctNU', 'X5A9PKY2FYk', 'upx7UwL4Pws', 'whHJ-WTEu_4']
    };
  };
  out$.getPosterLists = getPosterLists = function(){
    return {
      'class1': ['tablet'],
      'class2': ['tablet', 'teacherb'],
      'class3': ['tablet', 'teacherc'],
      'other': ['tablet', 'kiley']
    };
  };
  all_feed_items_cache = null;
  out$.getAllFeedItems = getAllFeedItems = function(){
    var wordlist, readinglist, videolists, fillblanklist, wordcategories, bars, res$, i$, ref$, len$, levelnum, dots, data, typeletter, word, typeword, balance, number, addition, ref1$, addval, sumval, admin, example, iframe, lettervideo, videoid, numbervideo, readaloud, sentences, fillblank, sentence, category, fillblanksocial;
    if (all_feed_items_cache != null) {
      return all_feed_items_cache;
    }
    wordlist = getFeedWordList();
    readinglist = getFeedReadingList();
    videolists = getFeedVideoLists();
    fillblanklist = getFillBlankSentencesWithCategories();
    wordcategories = getWordCategories();
    res$ = [];
    for (i$ = 0, len$ = (ref$ = [0, 1, 2]).length; i$ < len$; ++i$) {
      levelnum = ref$[i$];
      res$.push({
        itemtype: 'bars',
        data: {
          level: levelnum
        },
        social: {
          poster: 'tablet'
        }
      });
    }
    bars = res$;
    res$ = [];
    for (i$ = 0, len$ = (ref$ = [
      {
        numdots: 7,
        targetformula: '_x_=_'
      }, {
        numdots: 4,
        targetformula: '3x4=_'
      }, {
        numdots: 6,
        targetformula: '_x6=18'
      }, {
        numdots: 5,
        targetformula: '3x_=15'
      }, {
        numdots: 8,
        targetformula: '_x_=24'
      }
    ]).length; i$ < len$; ++i$) {
      data = ref$[i$];
      res$.push({
        itemtype: 'dots',
        data: data,
        social: {
          poster: 'tablet'
        }
      });
    }
    dots = res$;
    res$ = [];
    for (i$ = 0, len$ = wordlist.length; i$ < len$; ++i$) {
      word = wordlist[i$];
      res$.push({
        itemtype: 'typeletter',
        data: {
          word: word
        },
        social: {
          poster: 'tablet',
          finishedby: []
        }
      });
    }
    typeletter = res$;
    res$ = [];
    for (i$ = 0, len$ = wordlist.length; i$ < len$; ++i$) {
      word = wordlist[i$];
      res$.push({
        itemtype: 'typeword',
        data: {
          word: word
        },
        social: {
          poster: 'tablet',
          finishedby: []
        }
      });
    }
    typeword = res$;
    res$ = [];
    for (i$ = 0, len$ = (ref$ = [1, 2, 3, 5, 10, 14, 57, 129, 206, 329, 453, 511, 933]).length; i$ < len$; ++i$) {
      number = ref$[i$];
      res$.push({
        itemtype: 'balance',
        data: {
          number: number
        },
        social: {
          poster: 'tablet'
        }
      });
    }
    balance = res$;
    res$ = [];
    for (i$ = 0, len$ = (ref$ = [[1, 2], [1, 3], [1, 5], [2, 4], [2, 6], [2, 10], [3, 6], [3, 9], [5, 10]]).length; i$ < len$; ++i$) {
      ref1$ = ref$[i$], addval = ref1$[0], sumval = ref1$[1];
      res$.push({
        itemtype: 'addition',
        data: {
          sum: sumval,
          add: addval
        },
        social: {
          poster: 'tablet'
        }
      });
    }
    addition = res$;
    admin = [{
      itemtype: 'admin',
      social: {
        poster: 'tablet'
      }
    }];
    example = [{
      itemtype: 'example',
      data: {
        foo: 'somefooval',
        bar: 'somebarval'
      },
      social: {
        poster: 'tablet',
        finishedby: []
      }
    }];
    iframe = [{
      itemtype: 'iframe',
      data: {
        activitypage: 'iframe-activity-example.html',
        thumbnailpage: 'iframe-thumbnail-example.html',
        params: {
          foo: 'somefooval',
          bar: 'somebarval'
        }
      },
      social: {
        poster: 'tablet',
        finishedby: []
      }
    }];
    res$ = [];
    for (i$ = 0, len$ = (ref$ = videolists.lettervideo).length; i$ < len$; ++i$) {
      videoid = ref$[i$];
      res$.push({
        itemtype: 'video',
        data: {
          itemcategory: 'lettervideo',
          videoid: videoid
        },
        social: {
          poster: 'tablet'
        }
      });
    }
    lettervideo = res$;
    res$ = [];
    for (i$ = 0, len$ = (ref$ = videolists.numbervideo).length; i$ < len$; ++i$) {
      videoid = ref$[i$];
      res$.push({
        itemtype: 'video',
        data: {
          itemcategory: 'numbervideo',
          videoid: videoid
        },
        social: {
          poster: 'tablet'
        }
      });
    }
    numbervideo = res$;
    res$ = [];
    for (i$ = 0, len$ = readinglist.length; i$ < len$; ++i$) {
      sentences = readinglist[i$];
      res$.push({
        itemtype: 'readaloud',
        data: {
          sentences: sentences
        },
        social: {
          poster: 'tablet'
        }
      });
    }
    readaloud = res$;
    res$ = [];
    for (i$ = 0, len$ = fillblanklist.length; i$ < len$; ++i$) {
      ref$ = fillblanklist[i$], sentence = ref$[0], category = ref$[1];
      res$.push({
        itemtype: 'fillblank',
        data: {
          sentence: sentence,
          wordoptions: wordcategories[category]
        },
        social: {
          poster: 'tablet'
        }
      });
    }
    fillblank = res$;
    res$ = [];
    for (i$ = 0, len$ = fillblanklist.length; i$ < len$; ++i$) {
      ref$ = fillblanklist[i$], sentence = ref$[0], category = ref$[1];
      res$.push({
        itemtype: 'fillblanksocial',
        data: {
          sentence: sentence,
          wordoptions: wordcategories[category],
          firstentered: wordcategories[category][0]
        },
        social: {
          poster: 'tablet'
        }
      });
    }
    fillblanksocial = res$;
    all_feed_items_cache = {
      dots: dots,
      typeword: typeword,
      typeletter: typeletter,
      readaloud: readaloud,
      balance: balance,
      addition: addition,
      lettervideo: lettervideo,
      numbervideo: numbervideo,
      fillblank: fillblank,
      fillblanksocial: fillblanksocial
    };
    return all_feed_items_cache;
  };
  feed_items_cache = null;
  out$.getSampleFeedItems = getSampleFeedItems = function(){
    var wordlist, readinglist, videolists, fillblanklist, wordcategories, bars, res$, i$, ref$, len$, levelnum, dots, data, typeletter, word, typeword, balance, number, addition, ref1$, addval, sumval, admin, example, iframe, lettervideo, videoid, numbervideo, readaloud, sentences, fillblank, sentence, category, fillblanksocial, defaults;
    if (feed_items_cache != null) {
      return feed_items_cache;
    }
    wordlist = getFeedWordList();
    readinglist = getFeedReadingList();
    videolists = getFeedVideoLists();
    fillblanklist = getFillBlankSentencesWithCategories();
    wordcategories = getWordCategories();
    res$ = [];
    for (i$ = 0, len$ = (ref$ = [0, 1, 2]).length; i$ < len$; ++i$) {
      levelnum = ref$[i$];
      res$.push({
        itemtype: 'bars',
        data: {
          level: levelnum
        },
        social: {
          poster: 'tablet'
        }
      });
    }
    bars = res$;
    res$ = [];
    for (i$ = 0, len$ = (ref$ = [
      {
        numdots: 7,
        targetformula: '_x_=_'
      }, {
        numdots: 4,
        targetformula: '3x4=_'
      }, {
        numdots: 6,
        targetformula: '_x6=18'
      }, {
        numdots: 5,
        targetformula: '3x_=15'
      }, {
        numdots: 8,
        targetformula: '_x_=24'
      }
    ]).length; i$ < len$; ++i$) {
      data = ref$[i$];
      res$.push({
        itemtype: 'dots',
        data: data,
        social: {
          poster: 'tablet'
        }
      });
    }
    dots = res$;
    res$ = [];
    for (i$ = 0, len$ = wordlist.length; i$ < len$; ++i$) {
      word = wordlist[i$];
      res$.push({
        itemtype: 'typeletter',
        data: {
          word: word
        },
        social: {
          poster: 'tablet',
          finishedby: []
        }
      });
    }
    typeletter = res$;
    res$ = [];
    for (i$ = 0, len$ = wordlist.length; i$ < len$; ++i$) {
      word = wordlist[i$];
      res$.push({
        itemtype: 'typeword',
        data: {
          word: word
        },
        social: {
          poster: 'tablet',
          finishedby: []
        }
      });
    }
    typeword = res$;
    res$ = [];
    for (i$ = 0, len$ = (ref$ = [1, 3, 9, 20, 34, 100]).length; i$ < len$; ++i$) {
      number = ref$[i$];
      res$.push({
        itemtype: 'balance',
        data: {
          number: number
        },
        social: {
          poster: 'tablet'
        }
      });
    }
    balance = res$;
    res$ = [];
    for (i$ = 0, len$ = (ref$ = [[1, 2], [1, 3], [2, 4]]).length; i$ < len$; ++i$) {
      ref1$ = ref$[i$], addval = ref1$[0], sumval = ref1$[1];
      res$.push({
        itemtype: 'addition',
        data: {
          sum: sumval,
          add: addval
        },
        social: {
          poster: 'tablet'
        }
      });
    }
    addition = res$;
    admin = [{
      itemtype: 'admin',
      social: {
        poster: 'tablet'
      }
    }];
    example = [{
      itemtype: 'example',
      data: {
        foo: 'somefooval',
        bar: 'somebarval'
      },
      social: {
        poster: 'tablet',
        finishedby: []
      }
    }];
    iframe = [{
      itemtype: 'iframe',
      data: {
        activitypage: 'iframe-activity-example.html',
        thumbnailpage: 'iframe-thumbnail-example.html',
        params: {
          foo: 'somefooval',
          bar: 'somebarval'
        }
      },
      social: {
        poster: 'tablet',
        finishedby: []
      }
    }];
    res$ = [];
    for (i$ = 0, len$ = (ref$ = videolists.lettervideo).length; i$ < len$; ++i$) {
      videoid = ref$[i$];
      res$.push({
        itemtype: 'video',
        data: {
          itemcategory: 'lettervideo',
          videoid: videoid
        },
        social: {
          poster: 'tablet'
        }
      });
    }
    lettervideo = res$;
    res$ = [];
    for (i$ = 0, len$ = (ref$ = videolists.numbervideo).length; i$ < len$; ++i$) {
      videoid = ref$[i$];
      res$.push({
        itemtype: 'video',
        data: {
          itemcategory: 'numbervideo',
          videoid: videoid
        },
        social: {
          poster: 'tablet'
        }
      });
    }
    numbervideo = res$;
    res$ = [];
    for (i$ = 0, len$ = readinglist.length; i$ < len$; ++i$) {
      sentences = readinglist[i$];
      res$.push({
        itemtype: 'readaloud',
        data: {
          sentences: sentences
        },
        social: {
          poster: 'tablet'
        }
      });
    }
    readaloud = res$;
    res$ = [];
    for (i$ = 0, len$ = fillblanklist.length; i$ < len$; ++i$) {
      ref$ = fillblanklist[i$], sentence = ref$[0], category = ref$[1];
      res$.push({
        itemtype: 'fillblank',
        data: {
          sentence: sentence,
          wordoptions: wordcategories[category]
        },
        social: {
          poster: 'tablet'
        }
      });
    }
    fillblank = res$;
    res$ = [];
    for (i$ = 0, len$ = fillblanklist.length; i$ < len$; ++i$) {
      ref$ = fillblanklist[i$], sentence = ref$[0], category = ref$[1];
      res$.push({
        itemtype: 'fillblanksocial',
        data: {
          sentence: sentence,
          wordoptions: wordcategories[category],
          firstentered: wordcategories[category][0]
        },
        social: {
          poster: 'tablet'
        }
      });
    }
    fillblanksocial = res$;
    defaults = dots.slice(0, 1).concat(typeletter.slice(0, 1), typeword.slice(0, 1), balance.slice(0, 1), addition.slice(0, 1), lettervideo.slice(0, 1), numbervideo.slice(0, 1), readaloud.slice(0, 1), fillblanksocial.slice(0, 1));
    feed_items_cache = {
      defaults: defaults,
      bars: bars,
      dots: dots,
      typeword: typeword,
      typeletter: typeletter,
      readaloud: readaloud,
      balance: balance,
      addition: addition,
      lettervideo: lettervideo,
      numbervideo: numbervideo,
      fillblank: fillblank,
      fillblanksocial: fillblanksocial,
      admin: admin,
      example: example,
      iframe: iframe
    };
    return feed_items_cache;
  };
}).call(this);
