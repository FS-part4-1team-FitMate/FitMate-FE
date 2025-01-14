
const submitReview = async ({ id, rating, content }: { id: number; rating: number; content: string }) => {
    const response = await fetch(`/api/reviews/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rating, content }),
    });
}