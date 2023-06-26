import {tweetsData } from './data.js'
// console.log(tweetsData);


// to get uuid from uuid js

import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
  console.log(uuidv4()); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

//  third step is to give an event listner to entire page and to find out of like,retweet,and replies which buton is clicked by log out its uuid ,data=Atribute stored 

document.addEventListener('click',function(e){

    // console.log(e.target.dataset.like)
    if(e.target.dataset.like){
    handleLikeClick(e.target.dataset.like)
    
    }else if(e.target.dataset.retweets){
        handleRetweetClick(e.target.dataset.retweets)
    }else if(e.target.dataset.replies){
        handleReplyClick(e.target.dataset.replies)
    }else if(e.target.id === 'tweet-btn' ){
        handleTweetBtnClick()
    }
})
// fourth step setting a function which passes an argument(dataset)based on that we will identfy which tweet is liked and setting like and unlike

function handleLikeClick(tweeitId){
   const targetTweetObj = tweetsData.filter(function(tweet){
     return tweet.uuid === tweeitId
   })[0]
   if(targetTweetObj.isLiked){
    
    targetTweetObj.likes--
    // targetTweetObj.isLiked = false;
   }else{

       targetTweetObj.likes++
    //    targetTweetObj.isLiked = true
   }
//    fliping the boolian
   targetTweetObj.isLiked = ! targetTweetObj.isLiked
   render()

//    console.log(targetTweetObj)
}

// fifth step setting a function which passes an argument(dataset)based on that we will identfy which tweet is isRetweeted and setting Retweeted and not

function handleRetweetClick(tweetId){
    const targetTweetObj =tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId

    })[0]
if(targetTweetObj.isRetweeted){
    targetTweetObj.retweets--
}else{
    targetTweetObj.retweets++
}
 targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted
 render()
}
// function which is used to give the replay toggle effect
function handleReplyClick(replyId){
    document.getElementById(`replies-${replyId}`).classList.toggle('hidden')
}

function handleTweetBtnClick(){
    const tweetInput = document.getElementById('tweet-input') 
    if(tweetInput.value){

        tweetsData.unshift({
            handle: `@Scrimba `,
            profilePic: `img/scrimbalogo.png`,
            likes: 0,
            retweets: 0,
            tweetText: `${tweetInput.value}`,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuidv4()
        })
         tweetInput.value = ''
         render()
    }
       
}

// first step is to show the tweets which is stored in the data.js
 
function getFeedHtml(){
   let feedHtml = ''

   tweetsData.forEach(function(tweet){
// conditional class for making the color red while liking
    let likeIconClass = ''
    if(tweet.isLiked){
        likeIconClass = 'liked'
    }
    let retweetIconClass = ''
    if(tweet.isRetweeted){
        retweetIconClass = 'retweeted'
    }
    
    // div which shows the replies of tweets
    
    let repliesHtml = ''
        
    if(tweet.replies.length > 0){
        tweet.replies.forEach(function(reply){
            repliesHtml+=`
<div class="tweet-reply">
<div class="tweet-inner">
    <img src="${reply.profilePic}" class="profile-pic">
        <div>
            <p class="handle">${reply.handle}</p>
            <p class="tweet-text">${reply.tweetText}</p>
        </div>
    </div>
</div>
`
        })

    }
    feedHtml += `
    <div class="tweet">
    <div class="tweet-inner">
        <img src="${tweet.profilePic}" class="profile-pic">
        <div>
            <p class="handle">tweet.handle</p>
            <p class="tweet-text">${tweet.tweetText}</p>
            <div class="tweet-details">
                <span class="tweet-detail">
                    ${tweet.replies.length}
                    <i class="fa-regular fa-comment-dots" data-replies = "${tweet.uuid}"></i>
                </span>
                <span class="tweet-detail">
                ${tweet.likes}
                <i class="fa-solid fa-heart ${likeIconClass}" data-like = "${tweet.uuid}"></i>
                </span>
                <span class="tweet-detail">
                ${tweet. retweets}
                <i class="fa-solid fa-retweet ${retweetIconClass}" data-retweets = "${tweet.uuid}"></i>
                </span>
            </div>   
        </div>            
    </div>
    <div class="hidden" id="replies-${tweet.uuid}">
        ${repliesHtml}
    </div> 
</div>
`
})
return feedHtml

   }
       

// second step is to render the datas in the main html div having the id = feed

function render(){
    document.getElementById('feed').innerHTML = getFeedHtml()
}
render()