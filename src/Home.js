import React from 'react'
import Feed from './Feed';
export default function Home(props) {
  return (
    <div className="Home">
      {props.isLoading && <p className="statusMsg">Loading posts...</p>}
      {props.posts.length ? (
        <Feed posts={props.posts} />
      ) : (
        <p style ={{marginTop:"2rem"}}>
            {!props.isLoading && <p>No posts to display.</p>}
        </p>
      )}
    </div>
  )
}
