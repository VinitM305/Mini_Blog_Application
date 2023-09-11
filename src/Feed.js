import React from 'react'
import Post from './Post';
export default function Feed(props) {
  return (
    <div>
      {props.posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  )
}
