import { Comment, User } from "@/types";

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

export function generateComment(content: string, user: User) {
  return {
    id: new Date().valueOf(),
    content: content,
    user,
    score: 0,
    createdAt: new Date().toISOString(),
    replies: [],
  };
}

export function extractUniqueUsernames(comments: Comment[]) {
  const allUsernames = new Set(); // Use a Set to ensure uniqueness

  function processComments(commentsArray: Comment[]) {
    commentsArray.forEach((comment) => {
      allUsernames.add(comment.user.username);

      // Recurse into Replies
      if (comment.replies) {
        processComments(comment.replies);
      }
    });
  }

  processComments(comments);
  return Array.from(allUsernames); // Convert back to array
}
