import React from 'react'
import {Link} from 'react-router-dom';
export default function Post(props) {
  return (
    <div className="post">
      <Link to={`/postpage/${props.post.id}`}>
        <h2>{props.post.title}</h2>
        <p className='postDate'>{props.post.datetime}</p>
      </Link>
      <p className='postBody'>
        {
            (props.post.body).length <= 25 ? props.post.body:`${(props.post.body).slice(0,25)}...`
        }
      </p>
    </div>
  )
}
