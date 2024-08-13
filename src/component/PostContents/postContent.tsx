import React from 'react'
import "./postContent.css"
import SharePost from '../SharePost/SharePost'
import Posts from '../Posts/Posts'
// import Posts from '../Posts/Posts'

const PostContent = () => {
  return (
   <div className="PostSide">
       <SharePost/>
       <Posts/>
       {/* <Posts/> */}
   </div>
  )
}

export default PostContent;