---
title: Test page
---

existing-plugin-marker

```embed
title: 'A <script>alert("x")</script> & "quote"'
url: 'https://example.com/article?title=<bad>&quote="yes"'
image: 'https://images.example.com/card.png?label=<bad>'
description: 'A <strong>description</strong> & "quote"'
```

```embed
title: Invalid URLs
url: 'javascript:alert(1)'
image: 'data:image/svg+xml,<svg onload=alert(1)>'
description: Unsafe URLs are omitted.
```
