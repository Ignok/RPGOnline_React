import CommentItem from "./commentItem";
import ReplyCommentItem from "./replyCommentItem"
import {DatetimeToLocaleDateString} from "../../helpers/functions/DateTimeConverter"

export function CommentList({ comments, isRoot }) {
    return comments.map(comment => (
        <div key={comment.commentId}>
            {isRoot ? (
                <CommentItem {...comment}
                    username={comment.userResponse.username}
                    creationDate={DatetimeToLocaleDateString(
                        comment.creationDate
                    )}
                    content={comment.content}
                    avatar={comment.userResponse.picture}
                />
            ) : (
                <ReplyCommentItem {...comment}
                    username={comment.userResponse.username}
                    creationDate={DatetimeToLocaleDateString(
                        comment.creationDate
                    )}
                    content={comment.content}
                    avatar={comment.userResponse.picture}
                    responseUsername={comment.respondingUserResponse.username}
                />
            )}
        </div>
    ))
}
