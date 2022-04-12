# 知识

TF-IDF（Term Frequency / Inverse Document Frequency，词频-逆文本频率）
这个句子若用 BOW 模型，它的词表为：[‘football’, ‘john’, ‘likes’, ‘mary’, ‘play’, ‘to’, ‘too’]，则词向量表示为：[1 1 2 1 1 1 1]。若根据 BOW 模型提取这个句子的关键词，则为 “like”，但是显然这个句子的关键词应该为 “football”。而 TF-IDF 则可以解决这个问题。TF-IDF 看名字也知道包括两部分 TF 和 IDF。

# TF

**词频**（term frequency，tf）指的是某一个给定的词语在该文件中出现的频率。这个数字是对**词数**（term count）的归一化，以防止它偏向长的文件。（同一个词语在长文件里可能会比短文件有更高的词数，而不管该词语重要与否。）

TF 的公式为：

$$
TF(t)=\frac{术语t(term)在文章中出现的次数}{文章的术语总数}
$$

术语 t 在文章中出现的次数越多，TF 值越趋近于 1（TF 值介于 0-1）

# IDF

**逆向文件频率**（inverse document frequency，idf）是一个词语普遍重要性的度量。某些术语，如"is"，"of"和"that"，可能会出现很多次，但并不重要。因此，我们需要通过计算来权衡频繁的术语，同时扩大稀有术语
IDF 的公式为：

$$
IDF(t)=log(\frac{语料库中文档的总数}{包含术语 t 的文档数})=log(\frac{N}{df\_{t}})
$$

N 表示语料库中文档的总数
包含术语 t 的文档数越多，IDF 值越趋近于 0（IDF 值永远大于等于 0）
当然部分公式中不使用 log

# TF-IDF

术语的 tf‐idf 权重是其 tf 权重和 idf 权重的乘积：

$$
tf{-}idf*{t,d} = tf*{t,d} \times idf*{t}
$$

也有如下公式：

$$
tf{-}idf*{t,d} = log(1+tf*{t,d}) \times log(\frac{N}{df*{t}})
$$

$log(1+tf_{t,d})$ 的 log 可以选择去掉，但有 log 时需要加上 1 避免出现 log0 的情况

$log(\frac{N}{df*{t}})$就是$idf\_{t}$。见上面 IDF 公式

`某一特定文件内的高词语频率，以及该词语在整个文件集合中的低文件频率，可以产生出高权重的 tf-idf` 。因此，tf-idf 倾向于过滤掉常见的词语，保留重要的词语。

# 例题 1

计算以下带有 log 和不带 log 的 IDF 项。

| Term       | Df(t)      | IDF without log | IDF with log |
| ---------- | ---------- | --------------- | ------------ |
| National   | 1          | 10,000,000      |              |
| party      | 100        | 100,000         |              |
| John       | 1,000      | 10,000          |              |
| Key        | 10,000     |                 |              |
| Government | 100,000    |                 |              |
| English    | 1,000,000  |                 |              |
| the        | 10,000,000 |                 |              |

根据公式数学公式:$IDF(t)=log(\frac{N}{df\_{t}})$可以得出 N=10,000,000，那么有如下结果

| Term       | Df(t)      | IDF without log | IDF with log |
| ---------- | ---------- | --------------- | ------------ |
| National   | 1          | 10,000,000      | 7            |
| party      | 100        | 100,000         | 5            |
| John       | 1,000      | 10,000          | 4            |
| Key        | 10,000     | 1,000           | 3            |
| Government | 100,000    | 100             | 2            |
| English    | 1,000,000  | 10              | 1            |
| the        | 10,000,000 | 1               | 0            |

# 例题2

在包含3个文档的语料库中计算以下 4 个术语的 tf-idf 权重。对tf值使用非规范化形式

|           | doc1 | doc2 | doc3 |
| --------- | ---- | ---- | ---- |
| car       | 27   | 4    | 24   |
| auto      | 3    | 60   | 0    |
| insurance | 0    | 0    | 29   |
| best      | 14   | 4    | 17   |

结果:

|           | doc1 | doc2 | doc3 | tf | df | idf      | tf-idf   |
| --------- | ---- | ---- | ---- | -- | -- | -------- | -------- |
| car       | 27   | 4    | 24   | 55 | 3  | 0        | 0        |
| auto      | 3    | 60   | 0    | 63 | 2  | 0.176091 | 0.318053 |
| insurance | 0    | 0    | 29   | 29 | 1  | 0.477121 | 0.704766 |
| best      | 14   | 4    | 17   | 35 | 3  | 0        | 0        |

insurance会是个最佳搜索关键词

因为题目允许对tf值使用非规范化形式，所以tf是简单的数量相加。tf-idf=log(tf+1)*idf

# 代码

```python
from sklearn.feature_extraction.text import TfidfVectorizer


text = ["The quick brown fox jumped over the lazy dog.",
        "The dog jumped over the fox.",
        "The fox"]
  
vectorizer = TfidfVectorizer()


# 训练
vectorizer.fit(text)
# 训练后的数据集
print(vectorizer.vocabulary_)
# 数据集中每个词的idf（训练集的值为下标）
print(vectorizer.idf_)
# 转换
vector1 = vectorizer.transform([text[0]])
vector2 = vectorizer.transform([text[1]])
# 训练集的形状
print(vector1.shape)
print(vector1.toarray())
```
