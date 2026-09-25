---
title: Vector ও Dot Product — programming-এর চোখে
date: 2026-09-21
summary: Vector, magnitude, normalization, dot product ও cosine similarity — JavaScript ও NumPy উদাহরণসহ, বাংলায়।
tags: Mathematics, Machine Learning, বাংলা
lang: bn
repo: https://github.com/TanjilaShamima/mathematics-and-programming/blob/main/phase-1/vectorAndDotProduct.md
coverArt: vector
cover:
---

Vector দিয়ে একসঙ্গে কয়েকটি সংখ্যাকে প্রকাশ করা যায়। Dot product দিয়ে সমান dimension-এর দুটি vector থেকে একটি সংখ্যা পাওয়া যায়। এই নোটে বাস্তব সংখ্যার vector নিয়ে ধারণা, হিসাব এবং programming উদাহরণ আলোচনা করা হয়েছে।

## Vector

### Vector কী?

জ্যামিতিতে vector হলো এমন একটি রাশি যার **মান (magnitude)** ও **দিক (direction)** আছে। যেমন, “পূর্ব দিকে 5 মিটার সরণ” একটি vector। শুধু “5” একটি scalar বা একক সংখ্যা। Zero vector-এর মান শূন্য; এর নির্দিষ্ট দিক নেই।

Programming ও data analysis-এ vector-কে সংখ্যার একটি **সাজানো তালিকা** হিসেবে ব্যবহার করা হয়। প্রতিটি সংখ্যা একটি component বা উপাংশ।

```text
v = [3, 4]

প্রথম component = 3
দ্বিতীয় component = 4
Dimension = 2, কারণ এখানে 2টি component আছে
```

Coordinate plane-এ origin `(0, 0)` থেকে `(3, 4)` পর্যন্ত একটি তীর দিয়ে এই vector দেখানো যায়: ডানে 3 একক ও ওপরে 4 একক সরণ। একই সরণ অন্য জায়গা থেকেও শুরু হতে পারে।

| উদাহরণ | Dimension | অর্থ |
| --- | --- | --- |
| `[3, 4]` | 2D | x ও y বরাবর উপাংশ |
| `[2, -1, 5]` | 3D | x, y ও z বরাবর উপাংশ |
| `[80, 75, 90, 85]` | 4D | চারটি বিষয়ের নম্বর |

Vector-এ ক্রম গুরুত্বপূর্ণ: `[3, 4]` এবং `[4, 3]` আলাদা vector। সমান vector হতে dimension এবং সংশ্লিষ্ট প্রতিটি component সমান হতে হবে।

### Vector যোগ ও বিয়োগ

একই অবস্থানের component যোগ বা বিয়োগ করতে হয়। Vector দুটির dimension সমান হতে হবে।

```text
a = [2, 3]
b = [4, 1]

a + b = [2 + 4, 3 + 1] = [6, 4]
a − b = [2 − 4, 3 − 1] = [-2, 2]
```

জ্যামিতিতে `a + b` মানে প্রথমে `a` অনুযায়ী সরণ, তারপর সেখান থেকে `b` অনুযায়ী সরণ। শুরু থেকে শেষ পর্যন্ত মোট সরণই যোগফল।

দুটি বিন্দু `A = (1, 2)` ও `B = (4, 6)` হলে A থেকে B-এর displacement vector:

```text
AB = B − A = [4 − 1, 6 − 2] = [3, 4]
```

### Scalar দিয়ে গুণ

একটি scalar দিয়ে vector গুণ করলে প্রতিটি component ওই সংখ্যা দিয়ে গুণ হয়।

```text
v = [2, 3]

2v    = [4, 6]
0.5v  = [1, 1.5]
−v    = [-2, -3]
0v    = [0, 0]
```

ধনাত্মক scalar দিক একই রাখে, ঋণাত্মক scalar দিক উল্টে দেয়। মান `|scalar|` গুণ হয়। শূন্য দিয়ে গুণ করলে zero vector পাওয়া যায়।

### Magnitude বা দৈর্ঘ্য

Vector-এর Euclidean magnitude লিখতে `‖v‖` ব্যবহার করা হয়। প্রতিটি component-এর বর্গ যোগ করে square root নিতে হয়।

```text
v = [v₁, v₂, ..., vₙ]
‖v‖ = √(v₁² + v₂² + ... + vₙ²)

v = [3, 4]
‖v‖ = √(3² + 4²) = √25 = 5

u = [2, -3, 6]
‖u‖ = √(4 + 9 + 36) = √49 = 7
```

এটি Pythagoras-এর সূত্রেরই সম্প্রসারণ। Component ঋণাত্মক হতে পারে, কিন্তু magnitude কখনো ঋণাত্মক হয় না।

দুটি বিন্দুর দূরত্ব হলো তাদের difference vector-এর magnitude। আগের `A` ও `B`-এর দূরত্ব তাই `‖B − A‖ = 5`।

### Unit Vector ও Normalization

যে vector-এর magnitude `1`, তাকে unit vector বলে। একটি nonzero vector-কে তার magnitude দিয়ে ভাগ করলে একই দিকের unit vector পাওয়া যায়। এই কাজকে normalization বলে।

```text
v̂ = v / ‖v‖

v = [3, 4], ‖v‖ = 5
v̂ = [3/5, 4/5] = [0.6, 0.8]

‖v̂‖ = √(0.6² + 0.8²) = √1 = 1
```

Zero vector normalize করা যায় না, কারণ এতে শূন্য দিয়ে ভাগ করতে হয়।

## Dot Product

### Dot Product কী?

সমান dimension-এর দুটি vector-এর একই অবস্থানের component গুণ করে সব গুণফল যোগ করলে dot product পাওয়া যায়। এর ফল একটি **scalar**।

```text
a · b = a₁b₁ + a₂b₂ + ... + aₙbₙ
      = Σᵢ₌₁ⁿ aᵢbᵢ
```

এখানে `·` হলো dot product-এর চিহ্ন এবং `Σ` মানে যোগফল।

```text
a = [2, 3]
b = [4, 1]

a · b = (2 × 4) + (3 × 1)
      = 8 + 3
      = 11
```

3D উদাহরণ:

```text
a = [1, 2, 3]
b = [4, 5, 6]

a · b = (1 × 4) + (2 × 5) + (3 × 6)
      = 4 + 10 + 18
      = 32
```

Element-wise multiplication করলে পাওয়া যেত `[4, 10, 18]`। Dot product পেতে এগুলো যোগ করতে হয়।

### Dot Product ও কোণের সম্পর্ক

দুটি nonzero vector-এর মধ্যকার ছোট কোণ `θ`, যেখানে `0° ≤ θ ≤ 180°`, হলে:

```text
a · b = ‖a‖ ‖b‖ cos θ

cos θ = (a · b) / (‖a‖ ‖b‖)
```

অর্থাৎ dot product শুধু দিক নয়, vector দুটির magnitude-এর ওপরও নির্ভর করে।

| Dot product | কোণ | সম্পর্ক |
| --- | --- | --- |
| ধনাত্মক | `0° ≤ θ < 90°` | দিকের মধ্যে 90°-এর কম কোণ |
| শূন্য | `θ = 90°` | পরস্পর লম্ব বা orthogonal |
| ঋণাত্মক | `90° < θ ≤ 180°` | দিকের মধ্যে 90°-এর বেশি কোণ |

এই কোণের ব্যাখ্যা nonzero vector-এর জন্য। Zero vector-এর সঙ্গে যেকোনো vector-এর dot product শূন্য, কিন্তু zero vector-এর সঙ্গে কোণ সংজ্ঞায়িত নয়।

```text
[1, 0] · [5, 0]  =  5 → একই দিক, θ = 0°
[1, 0] · [0, 5]  =  0 → লম্ব, θ = 90°
[1, 0] · [-5, 0] = -5 → বিপরীত দিক, θ = 180°
```

ধনাত্মক dot product মানেই একদম একই দিক নয়। যেমন `[1, 0] · [1, 1] = 1`, কিন্তু তাদের মধ্যে কোণ `45°`।

### Cosine Similarity

Magnitude-এর প্রভাব বাদ দিয়ে direction তুলনা করতে cosine similarity ব্যবহার করা হয়।

```text
cosineSimilarity(a, b) = (a · b) / (‖a‖ ‖b‖)

a = [1, 0], b = [1, 1]
a · b = 1
‖a‖ = 1, ‖b‖ = √2

cosine similarity = 1 / √2 ≈ 0.7071
θ = arccos(0.7071...) = 45°
```

এর মান `−1` থেকে `1` পর্যন্ত: `1` একই দিক, `0` লম্ব, `−1` বিপরীত দিক বোঝায়। Unit vector দুটির dot product-ই তাদের cosine similarity। কোনো vector শূন্য হলে এই হিসাব সংজ্ঞায়িত নয়।

### দরকারি বৈশিষ্ট্য

সমান dimension-এর বাস্তব vector ও scalar `k`-এর জন্য:

```text
a · b = b · a                    → ক্রম বদলালেও ফল একই
a · (b + c) = a · b + a · c       → যোগের ওপর বণ্টন হয়
(ka) · b = k(a · b)              → scalar বাইরে আনা যায়
v · v = ‖v‖²                     → নিজের সঙ্গে dot product = মানের বর্গ
```

যেমন `[3, 4] · [3, 4] = 25`, তাই magnitude `√25 = 5`।

### বাস্তব ব্যবহার: মোট দাম ও Weighted Sum

ধরো তিনটি পণ্যের পরিমাণ এবং একক দাম দুটি vector-এ রাখা আছে। দুই vector-এ পণ্যের ক্রম একই হতে হবে।

```text
quantity = [2, 3, 1]
price    = [50, 20, 100]

মোট দাম = quantity · price
        = 2×50 + 3×20 + 1×100
        = 260
```

Machine learning-এর linear model-এও একইভাবে feature ও weight-এর dot product নেওয়া হয়, তারপর bias যোগ হয়:

```text
prediction = w · x + bias

x = [2, 3], w = [4, 5], bias = 1
prediction = 4×2 + 5×3 + 1 = 24
```

## JavaScript-এ Vector ও Dot Product

নিচের উদাহরণে vector হিসেবে finite number-সহ nonempty array ব্যবহার করা হচ্ছে। Binary operation-এর আগে dimension পরীক্ষা করা হয়েছে।

```js
function checkDimensions(a, b) {
  if (a.length !== b.length) {
    throw new Error("Vectors must have the same dimension");
  }
}

function addVectors(a, b) {
  checkDimensions(a, b);
  return a.map((value, i) => value + b[i]);
}

function subtractVectors(a, b) {
  checkDimensions(a, b);
  return a.map((value, i) => value - b[i]);
}

function scaleVector(v, scalar) {
  return v.map((value) => value * scalar);
}

function dotProduct(a, b) {
  checkDimensions(a, b);
  let total = 0;
  for (let i = 0; i < a.length; i++) {
    total += a[i] * b[i];
  }
  return total;
}

function magnitude(v) {
  return Math.hypot(...v);
}

function normalize(v) {
  const length = magnitude(v);
  if (length === 0) {
    throw new Error("Cannot normalize a zero vector");
  }
  return v.map((value) => value / length);
}

function cosineSimilarity(a, b) {
  // normalize() zero vector হলে error দেবে।
  const cosine = dotProduct(normalize(a), normalize(b));
  // Floating-point rounding-এর কারণে মান সামান্য সীমা ছাড়াতে পারে।
  return Math.max(-1, Math.min(1, cosine));
}

console.log(addVectors([2, 3], [4, 1]));      // [6, 4]
console.log(subtractVectors([2, 3], [4, 1])); // [-2, 2]
console.log(scaleVector([2, 3], 2));          // [4, 6]
console.log(magnitude([3, 4]));              // 5
console.log(normalize([3, 4]));              // [0.6, 0.8]
console.log(dotProduct([1, 2, 3], [4, 5, 6])); // 32

const similarity = cosineSimilarity([1, 0], [1, 1]);
const angleRadians = Math.acos(similarity);
const angleDegrees = angleRadians * 180 / Math.PI;
console.log(similarity);   // প্রায় 0.7071
console.log(angleDegrees); // প্রায় 45
```

`Math.acos()` radians-এ কোণ দেয়; degrees পেতে `180 / Math.PI` দিয়ে গুণ করতে হয়। Dot product loop-এর time complexity `O(n)` এবং অতিরিক্ত space `O(1)`।

## Python ও NumPy উদাহরণ

NumPy ইনস্টল করা environment-এ নিচের কোড চালানো যাবে। এখানে সব array একমাত্রিক।

```python
import numpy as np

a = np.array([1, 2, 3])
b = np.array([4, 5, 6])
v = np.array([3.0, 4.0])

print(a + b)              # [5 7 9]
print(a - b)              # [-3 -3 -3]
print(2 * a)              # [2 4 6]
print(a * b)              # [4 10 18]: element-wise multiplication
print(np.dot(a, b))       # 32: dot product
print(a @ b)              # 32: এই 1D array দুটির dot product

length = np.linalg.norm(v)
print(length)            # 5.0
if length == 0:
    raise ValueError("Cannot normalize a zero vector")
print(v / length)        # [0.6 0.8]
```

সাধারণ Python list-এ `[1, 2] + [3, 4]` দিলে `[1, 2, 3, 4]` হয়, vector addition হয় না। NumPy array-তে `+` component ধরে যোগ করে।

## সাধারণ ভুল

- `[1, 2]` ও `[3, 4, 5]`-এর dot product করার চেষ্টা: dimension এক নয়।
- Dot product-এর ফল vector ধরে নেওয়া: ফল scalar।
- Element-wise multiplication-কে dot product বলা: গুণফলগুলো যোগ করা বাকি।
- Magnitude হিসাব করার সময় square root বাদ দেওয়া: তখন magnitude-এর বর্গ পাওয়া যায়।
- Zero vector normalize করা বা cosine similarity-তে ব্যবহার করা: শূন্য দিয়ে ভাগ হয়।
- JavaScript-এ array-এর ওপর সরাসরি `+` দিয়ে vector যোগ করা: component ধরে যোগ করতে হবে।
- বড় dot product দেখেই direction বেশি কাছাকাছি বলা: magnitude-ও ফলকে প্রভাবিত করে।

## অনুশীলন

1. `[5, -2, 7]`-এর dimension কত?
2. `a = [1, 4]`, `b = [3, -2]` হলে `a + b`, `a − b` ও `3a` বের করো।
3. `[6, 8]`-এর magnitude ও একই দিকের unit vector বের করো।
4. `[2, -1, 3] · [4, 5, 2]` হিসাব করো।
5. `[2, 3]` ও `[3, -2]` কি পরস্পর লম্ব?
6. `[1, 0]` ও `[1, 1]`-এর cosine similarity ও মধ্যবর্তী কোণ কত?
7. পরিমাণ `[3, 2, 4]` এবং একক দাম `[10, 25, 5]` হলে মোট দাম কত?
8. `[0, 0]`-কে unit vector-এ রূপান্তর করা যায় না কেন?

### উত্তর

1. `3`।
2. যোগ `[4, 2]`, বিয়োগ `[-2, 6]`, scalar multiplication `[3, 12]`।
3. Magnitude `√(36 + 64) = 10`; unit vector `[0.6, 0.8]`।
4. `8 − 5 + 6 = 9`।
5. হ্যাঁ; দুটি vector-ই nonzero এবং dot product `6 − 6 = 0`।
6. `1/√2 ≈ 0.7071`; কোণ `45°`।
7. `3×10 + 2×25 + 4×5 = 100`।
8. এর magnitude শূন্য; normalization করতে শূন্য দিয়ে ভাগ করতে হতো।
