/**
 * Instagram Graph API Proxy - Vercel Serverless Function
 * CORS sorununu çözmek için sunucu tarafından Instagram API'ye istek yapar.
 */

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { access_token, limit = "15" } = req.query;

  if (!access_token) {
    return res.status(400).json({ error: "access_token gerekli" });
  }

  try {
    const [userRes, mediaRes] = await Promise.all([
      fetch(
        `https://graph.instagram.com/me?fields=id,username,account_type&access_token=${access_token}`,
      ),
      fetch(
        `https://graph.instagram.com/me/media?fields=id,media_type,media_url,permalink,timestamp,caption,like_count,comments_count,children{media_type,media_url}&access_token=${access_token}&limit=${limit}`,
      ),
    ]);

    if (!userRes.ok) {
      const err = await userRes.json();
      return res.status(userRes.status).json(err);
    }
    if (!mediaRes.ok) {
      const err = await mediaRes.json();
      return res.status(mediaRes.status).json(err);
    }

    const userInfo = await userRes.json();
    const mediaData = await mediaRes.json();
    const postsData = mediaData.data || [];

    const detailedData = await Promise.all(
      postsData.map(async (post) => {
        if (
          post.media_type === "CAROUSEL_ALBUM" &&
          post.children?.data?.length > 0
        ) {
          const firstImage = post.children.data.find(
            (c) => c.media_type === "IMAGE",
          );
          if (firstImage) post.media_url = firstImage.media_url;
        }

        if (
          post.caption !== undefined &&
          post.like_count !== undefined &&
          post.comments_count !== undefined
        ) {
          return post;
        }

        try {
          const detailRes = await fetch(
            `https://graph.instagram.com/${post.id}?fields=id,timestamp,caption,like_count,comments_count&access_token=${access_token}`,
          );
          const detail = await detailRes.json();
          return {
            ...post,
            ...detail,
            like_count: detail.like_count ?? post.like_count ?? 0,
            comments_count: detail.comments_count ?? post.comments_count ?? 0,
          };
        } catch {
          return {
            ...post,
            like_count: post.like_count ?? 0,
            comments_count: post.comments_count ?? 0,
          };
        }
      }),
    );

    res.status(200).json({ userInfo, posts: detailedData });
  } catch (error) {
    res.status(500).json({
      error: error.message || "Instagram verisi alınamadı",
    });
  }
}
