import React from 'react'
import {useParams,Link} from 'react-router-dom'
export default function PostPage({posts,handleDelete}) {
  const { id } = useParams();
  const post = posts.find(post => (post.id).toString() === id);
  return (
    <div className = "PostPage">
      <div className = "post">
        {post &&
            <>
                <h2>{post.title}</h2>
                <p className="postDate">{post.datetime}</p>
                <p className="postBody">{post.body}</p>
                <Link to={`/edit/${post.id}`}><button className="editButton">Edit Post</button></Link>
                <button className="deleteButton" onClick={() => handleDelete(post.id)}>
                    Delete Post
                </button>
            </>
        }
        {!post &&
            <>
                <h2>Page Not Found</h2>
                <p>Well, that's disappointing.</p>
                <p>
                    <Link to='/'>Visit Our Homepage</Link>
                </p>
            </>
        }
      </div>
    </div>
  )
}
