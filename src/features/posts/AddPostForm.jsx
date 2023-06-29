import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postAdded } from './postsSlice'
import { selectAllUsers } from '../users/usersSlice'

const AddPostForm = () => {
	const dispatch = useDispatch()

	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')
	const [userId, setUserId] = useState('')

	const users = useSelector(selectAllUsers)

	const onTitleChangeHandler = (e) => setTitle(e.target.value)
	const onContentChangeHandler = (e) => setContent(e.target.value)
	const onAuthorChangeHandler = (e) => setUserId(e.target.value)

	const onSavePostClicked = () => {
		if (title && content) {
			dispatch(postAdded(title, content, userId))

			setTitle('')
			setContent('')
		}
	}

	const usersOptions = users.map((user) => (
		<option value={user.id} key={user.id}>
			{user.name}
		</option>
	))

	const canSave = Boolean(title) && Boolean(content) && Boolean(userId)

	return (
		<section>
			<h2>Add a new post</h2>
			<form>
				<label htmlFor="postTitle">Post Title:</label>
				<input
					type="text"
					id="postTitle"
					name="postTitle"
					value={title}
					onChange={onTitleChangeHandler}
				/>
				<label htmlFor="postAuthor">Author: </label>
				<select
					id="postAuthor"
					value={userId}
					onChange={onAuthorChangeHandler}
				>
					<option value=""></option>
					{usersOptions}
				</select>
				<label htmlFor="postContent">Content:</label>
				<input
					type="text"
					id="postContent"
					name="postTitle"
					value={content}
					onChange={onContentChangeHandler}
				/>
				<button
					type="button"
					disabled={!canSave}
					onClick={onSavePostClicked}
				>
					Save post
				</button>
			</form>
		</section>
	)
}

export default AddPostForm
