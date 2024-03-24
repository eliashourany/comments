import { Comment } from "@/types";

export function countReplies(comment: Comment) {
  let totalReplies = comment.replies ? comment.replies.length : 0;

  for (const reply of comment.replies || []) {
    totalReplies += countReplies(reply);
  }

  return totalReplies;
}

export const findComment = (
  comments: Comment[],
  commentId: number
): Comment | undefined => {
  for (const comment of comments) {
    if (comment.id === commentId) {
      return comment;
    }
    const foundComment = findComment(comment.replies || [], commentId);
    if (foundComment) {
      return foundComment;
    }
  }
};

export function deleteCommentById(comments: Comment[], commentId: number) {
  for (let i = 0; i < comments.length; i++) {
    if (comments[i].id === commentId) {
      comments.splice(i, 1);
      return true;
    }

    if (deleteCommentById(comments[i].replies || [], commentId)) {
      return true;
    }
  }

  return false;
}

export function updateCommentById(
  comments: Comment[],
  commentId: number,
  updates: Partial<Comment>
) {
  for (let i = 0; i < comments.length; i++) {
    if (comments[i].id === commentId) {
      comments[i] = {
        ...comments[i],
        ...updates,
      };

      return true;
    }

    if (updateCommentById(comments[i].replies || [], commentId, updates)) {
      return true;
    }
  }

  return false;
}
