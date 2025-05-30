# fast-escape-html

**Fastest**, zero-dependencies, plain JavaScript-based, 100% test coverage, HTML escaping library for JavaScript, works in both Node.js and browser.

Even faster than the Rust-based `@napi-rs/escape` with real world HTMLs (see benchmark below)!

## Installation

```bash
# Using npm, yarn, or pnpm
npm install fast-escape-html
yarn add fast-escape-html
pnpm add fast-escape-html
```

## Usage

```ts
import { escapeHTML, unescapeHTML } from 'fast-escape-html';
```

## **DO NOT USE `unescape-html` OR `escape-goat` TO UNESCAPE UN-TRUSTED HTML!**

Only use safe libraries like `fast-escape-html` or `html-escaper` that only look up and replace the entire input once.

Both `unescape-html` and `escape-goat` use the **multiple replace** implementation similar to this:

```ts
function unescapeHTML(str: string): string {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}
```

BUT THAT IS **UNSAFE**! Considering this **untrusted input**:

```html
&amp;lt;script&amp;gt;alert("yo")&amp;lt;/script&amp;gt;
```

With `fast-escape-html` or `html-escaper` it will become:

```html
&lt;script&gt;alert("yo")&lt;/script&gt;
```

Which is safe. But with `unescape-html` or `escape-goat`, it will become:

```html
<script>alert("yo")</script>
```

Boom, XSS!

## Benchmark

The benchmark uses [`mitata`](https://www.npmjs.com/package/mitata) against realworld websites' HTMLs:

- https://skk.moe
- https://github.com (in incognito mode)
- https://stackoverflow.com/questions (in incognito mode)
- https://www.google.com (in incognito mode)

```bash
# Before running the benchmark, build the dist
# The benchmark cases are run against the built files instead of the source files
pnpm i && pnpm run build

# Run the benchmark
pnpm run bench
# On supported platforms, you can use "sudo" to enable hardware counter
# https://github.com/evanwashere/mitata#hardware-counters
sudo pnpm run bench
```

### Escape

```
clk: ~3.17 GHz
cpu: Apple M2 Max
runtime: node 22.15.1 (arm64-darwin)

benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
• skk.moe
------------------------------------------- -------------------------------
fast-escape-html             227.50 µs/iter 229.71 µs  █
                    (208.46 µs … 430.29 µs) 359.75 µs  █▆
                    (100.02 kb … 883.06 kb) 485.43 kb ████▅▃▂▂▁▁▁▁▁▁▁▁▁▁▁▁▁
                  4.64 ipc (  0.87% stalls)  99.35% L1 data cache
        777.26k cycles   3.61M instructions  21.15% retired LD/ST (763.48k)

escape-html                  231.02 µs/iter 235.46 µs  █
                    (211.71 µs … 488.08 µs) 380.33 µs  █
                    ( 35.66 kb … 723.82 kb) 484.97 kb ███▆▆▃▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                  4.60 ipc (  1.02% stalls)  99.12% L1 data cache
        782.60k cycles   3.60M instructions  21.07% retired LD/ST (759.07k)

@napi-rs/escape              262.46 µs/iter 263.04 µs  █
                      (226.17 µs … 1.55 ms) 633.96 µs ██
                    (207.75 kb … 207.77 kb) 207.77 kb ██▇▇▄▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                  4.52 ipc ( 16.84% stalls)  83.70% L1 data cache
        873.05k cycles   3.95M instructions  23.64% retired LD/ST (933.00k)

html-escaper                 385.23 µs/iter 385.38 µs  █
                    (347.17 µs … 963.50 µs) 660.58 µs  ██
                    (508.75 kb … 576.19 kb) 571.14 kb ▅███▃▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                  4.23 ipc (  3.01% stalls)  97.82% L1 data cache
          1.31M cycles   5.53M instructions  34.01% retired LD/ST (  1.88M)

lodash.escape                389.55 µs/iter 388.08 µs  █
                      (353.88 µs … 1.47 ms) 813.17 µs  █
                    (468.27 kb … 576.36 kb) 574.02 kb ███▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                  4.24 ipc (  2.95% stalls)  97.89% L1 data cache
          1.33M cycles   5.64M instructions  34.09% retired LD/ST (  1.92M)

escape-goat                  506.45 µs/iter 499.46 µs  █
                      (454.54 µs … 1.29 ms)   1.05 ms  █
                    (  1.22 mb …   1.22 mb)   1.22 mb ███▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                  3.60 ipc (  2.92% stalls)  97.54% L1 data cache
          1.72M cycles   6.21M instructions  30.87% retired LD/ST (  1.92M)

• github.com (incognito)
------------------------------------------- -------------------------------
fast-escape-html             764.52 µs/iter 766.75 µs   █
                      (708.88 µs … 1.17 ms) 985.13 µs  ▇█▇▅
                    (  1.19 mb …   1.19 mb)   1.19 mb ▃████▇▄▂▁▁▁▁▁▁▁▂▃▂▂▂▁
                  4.62 ipc (  0.70% stalls)  99.50% L1 data cache
          2.61M cycles  12.04M instructions  20.30% retired LD/ST (  2.45M)

escape-html                  771.81 µs/iter 777.13 µs  █▇▃
                      (717.63 µs … 1.17 ms)   1.04 ms ████▅
                    (  1.19 mb …   1.19 mb)   1.19 mb █████▆▄▂▂▁▁▁▂▁▃▂▂▂▁▁▂
                  4.56 ipc (  0.80% stalls)  99.31% L1 data cache
          2.65M cycles  12.06M instructions  20.16% retired LD/ST (  2.43M)

@napi-rs/escape              878.95 µs/iter 899.88 µs     ▆▆█▇
                      (793.75 µs … 1.32 ms)   1.07 ms    ▃████▇▅
                    (697.81 kb … 697.81 kb) 697.81 kb ▅█████████▇▅▄▂▃▂▁▁▁▁▁
                  4.73 ipc ( 19.05% stalls)  82.51% L1 data cache
          2.95M cycles  13.95M instructions  23.44% retired LD/ST (  3.27M)

html-escaper                   1.24 ms/iter   1.23 ms  █
                        (1.04 ms … 4.10 ms)   2.79 ms  █
                    (  1.37 mb …   1.43 mb)   1.39 mb ██▇▄▂▁▂▁▂▂▁▁▁▁▁▁▁▁▁▁▁
                  3.92 ipc (  2.50% stalls)  98.03% L1 data cache
          3.95M cycles  15.45M instructions  33.35% retired LD/ST (  5.15M)

lodash.escape                  1.16 ms/iter   1.16 ms  ▂█▃
                        (1.04 ms … 1.88 ms)   1.75 ms  ███
                    (  1.37 mb …   1.43 mb)   1.39 mb ▅████▃▂▁▁▁▁▂▁▂▁▂▂▁▂▁▁
                  4.02 ipc (  2.52% stalls)  98.06% L1 data cache
          3.90M cycles  15.65M instructions  33.64% retired LD/ST (  5.27M)

escape-goat                    1.34 ms/iter   1.32 ms  █▅
                        (1.18 ms … 2.18 ms)   1.93 ms  ███
                    (  3.82 mb …   3.82 mb)   3.82 mb ▄███▇▃▂▁▁▁▂▃▂▂▂▃▃▂▂▁▁
                  3.58 ipc (  3.40% stalls)  97.29% L1 data cache
          4.55M cycles  16.29M instructions  30.53% retired LD/ST (  4.97M)

• stackoverflow.com (incognito)
------------------------------------------- -------------------------------
fast-escape-html             681.29 µs/iter 677.21 µs  █▅
                      (611.54 µs … 1.89 ms)   1.04 ms ▃██▂
                    (  1.18 mb …   1.18 mb)   1.18 mb ████▅▃▂▂▂▁▁▁▁▂▂▂▂▂▁▁▁
                  4.42 ipc (  0.84% stalls)  99.35% L1 data cache
          2.30M cycles  10.16M instructions  21.19% retired LD/ST (  2.15M)

escape-html                  734.02 µs/iter 704.79 µs  █
                      (621.92 µs … 3.83 ms)   1.81 ms ▅█
                    (  1.18 mb …   1.18 mb)   1.18 mb ██▄▂▂▂▃▂▁▁▁▁▁▁▁▁▁▁▁▁▁
                  4.31 ipc (  0.94% stalls)  99.13% L1 data cache
          2.36M cycles  10.19M instructions  21.02% retired LD/ST (  2.14M)

@napi-rs/escape              817.10 µs/iter 819.04 µs   █▅
                      (690.96 µs … 2.30 ms)   1.47 ms  ███
                    (586.23 kb … 586.23 kb) 586.23 kb ▃████▃▂▂▂▂▁▁▁▁▁▁▁▁▂▁▁
                  4.34 ipc ( 16.78% stalls)  82.95% L1 data cache
          2.56M cycles  11.11M instructions  23.36% retired LD/ST (  2.59M)

html-escaper                   1.12 ms/iter   1.12 ms   █▄
                        (1.00 ms … 1.80 ms)   1.60 ms  ▆██
                    (  1.23 mb …   1.32 mb)   1.28 mb ▆████▅▃▂▂▂▃▂▁▂▂▃▂▂▁▁▁
                  3.84 ipc (  2.45% stalls)  98.07% L1 data cache
          3.78M cycles  14.50M instructions  33.51% retired LD/ST (  4.86M)

lodash.escape                  1.11 ms/iter   1.12 ms  ▄█▃
                        (1.01 ms … 1.84 ms)   1.64 ms  ███▃
                    (  1.18 mb …   1.35 mb)   1.28 mb ▆████▄▂▁▁▁▁▁▁▁▂▂▁▂▁▂▁
                  3.92 ipc (  2.42% stalls)  98.13% L1 data cache
          3.76M cycles  14.75M instructions  33.73% retired LD/ST (  4.97M)

escape-goat                    1.31 ms/iter   1.25 ms  █
                        (1.10 ms … 2.44 ms)   2.28 ms  ██
                    (  2.82 mb …   3.30 mb)   3.30 mb ▅██▇▃▁▁▁▁▁▁▁▁▁▂▂▂▂▂▁▁
                  3.47 ipc (  2.78% stalls)  97.73% L1 data cache
          4.40M cycles  15.27M instructions  31.26% retired LD/ST (  4.77M)

• www.google.com (incognito)
------------------------------------------- -------------------------------
fast-escape-html             400.52 µs/iter 403.25 µs  ▄█
                    (371.13 µs … 683.21 µs) 591.13 µs  ██▇
                    (513.24 kb … 513.29 kb) 513.27 kb █████▃▂▂▁▁▁▁▁▁▁▁▁▁▁▁▁
                  4.81 ipc (  0.80% stalls)  99.13% L1 data cache
          1.36M cycles   6.53M instructions  19.21% retired LD/ST (  1.25M)

escape-html                  403.63 µs/iter 406.29 µs  █▇
                    (374.63 µs … 800.79 µs) 616.50 µs ███▅
                    (513.24 kb … 513.29 kb) 513.27 kb ████▅▃▂▁▁▁▁▁▁▁▁▁▁▁▂▁▁
                  4.78 ipc (  0.86% stalls)  98.99% L1 data cache
          1.37M cycles   6.53M instructions  19.10% retired LD/ST (  1.25M)

@napi-rs/escape              437.08 µs/iter 458.08 µs   █▅▂
                    (389.13 µs … 882.75 µs) 527.63 µs  ████▆▂ ▄██▄▂
                    (390.05 kb … 390.05 kb) 390.05 kb ▅█████████████▅▃▃▃▂▂▁
                  4.70 ipc ( 17.04% stalls)  82.80% L1 data cache
          1.47M cycles   6.91M instructions  22.04% retired LD/ST (  1.52M)

html-escaper                 514.35 µs/iter 515.21 µs   █▅
                      (454.92 µs … 1.06 ms) 784.38 µs  ▆██▄
                    (702.80 kb … 761.38 kb) 758.79 kb ▂████▅▂▁▁▁▁▁▁▁▂▂▁▁▁▁▁
                  4.09 ipc (  3.12% stalls)  97.59% L1 data cache
          1.72M cycles   7.06M instructions  33.20% retired LD/ST (  2.34M)

lodash.escape                509.40 µs/iter 506.67 µs  █
                      (463.13 µs … 1.17 ms) 936.88 µs  █▃
                    (745.70 kb … 825.25 kb) 760.75 kb ▄██▄▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                  4.19 ipc (  3.10% stalls)  97.69% L1 data cache
          1.71M cycles   7.18M instructions  33.44% retired LD/ST (  2.40M)

escape-goat                  668.79 µs/iter 652.33 µs  █▄
                      (560.54 µs … 1.91 ms)   1.34 ms  ██
                    (  1.82 mb …   1.97 mb)   1.97 mb ▅██▇▂▁▁▁▁▂▂▁▁▁▁▁▁▁▁▁▁
                  3.31 ipc (  4.73% stalls)  95.04% L1 data cache
          2.25M cycles   7.44M instructions  29.08% retired LD/ST (  2.16M)

• about.gitlab.com
------------------------------------------- -------------------------------
fast-escape-html             755.94 µs/iter 755.79 µs  ▄█
                      (693.46 µs … 1.21 ms)   1.12 ms ▄██▆
                    (917.91 kb … 917.98 kb) 917.93 kb ████▇▄▂▁▁▁▁▁▁▁▁▁▂▂▂▂▂
                  4.79 ipc (  0.79% stalls)  99.19% L1 data cache
          2.57M cycles  12.31M instructions  19.35% retired LD/ST (  2.38M)

escape-html                  766.91 µs/iter 768.13 µs  ██▃
                      (701.46 µs … 1.20 ms)   1.14 ms ▃███
                    (917.91 kb … 917.97 kb) 917.93 kb ████▇▃▂▂▁▁▁▁▁▁▁▁▂▂▂▂▁
                  4.74 ipc (  0.85% stalls)  99.05% L1 data cache
          2.60M cycles  12.32M instructions  19.24% retired LD/ST (  2.37M)

@napi-rs/escape              879.66 µs/iter 896.38 µs    ▆█
                      (789.88 µs … 1.68 ms)   1.16 ms   ▂███▅
                    (732.54 kb … 732.54 kb) 732.54 kb ▃▅██████▆▄▃▁▂▁▁▁▁▁▁▁▁
                  4.99 ipc ( 22.73% stalls)  79.87% L1 data cache
          2.95M cycles  14.73M instructions  23.03% retired LD/ST (  3.39M)

html-escaper                 948.21 µs/iter 947.33 µs  ▅█▂
                      (838.25 µs … 1.61 ms)   1.48 ms  ███
                    (  1.36 mb …   1.42 mb)   1.37 mb ▄████▃▂▂▂▂▂▂▁▁▂▁▁▁▁▂▁
                  4.08 ipc (  3.43% stalls)  97.48% L1 data cache
          3.19M cycles  13.04M instructions  32.88% retired LD/ST (  4.29M)

lodash.escape                951.94 µs/iter 947.83 µs  ▃█
                      (845.63 µs … 1.76 ms)   1.54 ms  ██▅
                    (  1.36 mb …   1.42 mb)   1.37 mb ▄███▅▃▁▁▁▁▁▂▂▂▂▂▁▁▁▁▁
                  4.11 ipc (  3.39% stalls)  97.54% L1 data cache
          3.21M cycles  13.20M instructions  33.12% retired LD/ST (  4.37M)

escape-goat                    1.18 ms/iter   1.16 ms   █
                      (994.13 µs … 1.92 ms)   1.75 ms  ▂██▃
                    (  3.65 mb …   3.65 mb)   3.65 mb ▂████▅▃▁▁▁▁▂▂▃▃▂▂▃▂▂▂
                  3.41 ipc (  4.86% stalls)  95.36% L1 data cache
          3.97M cycles  13.52M instructions  29.33% retired LD/ST (  3.96M)
```

### Unescape

```
• skk.moe
------------------------------------------- -------------------------------
fast-escape-html             625.54 µs/iter 621.04 µs █▄
                      (564.67 µs … 1.83 ms)   1.58 ms ██
                    (625.88 kb … 691.60 kb) 647.84 kb ██▆▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                  4.95 ipc (  2.02% stalls)  98.48% L1 data cache
          2.10M cycles  10.41M instructions  31.19% retired LD/ST (  3.25M)

html-escaper                 635.10 µs/iter 627.46 µs █▇
                      (567.17 µs … 1.86 ms)   1.60 ms ██
                    (625.88 kb … 691.60 kb) 647.93 kb ██▇▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                  4.98 ipc (  2.00% stalls)  98.47% L1 data cache
          2.12M cycles  10.55M instructions  30.81% retired LD/ST (  3.25M)

lodash.unescape              629.00 µs/iter 623.50 µs █▂
                      (570.08 µs … 1.73 ms)   1.62 ms ██
                    (625.88 kb … 669.27 kb) 647.90 kb ██▅▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                  5.01 ipc (  2.00% stalls)  98.49% L1 data cache
          2.11M cycles  10.57M instructions  30.98% retired LD/ST (  3.27M)

hexo-util                    633.44 µs/iter 626.71 µs █▆
                      (574.08 µs … 1.73 ms)   1.52 ms ██
                    (625.93 kb … 700.67 kb) 647.87 kb ██▆▃▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                  5.01 ipc (  1.96% stalls)  98.51% L1 data cache
          2.12M cycles  10.65M instructions  30.77% retired LD/ST (  3.28M)

unescape                       1.09 ms/iter   1.08 ms  █
                      (990.75 µs … 2.08 ms)   1.92 ms ██▆
                    (  1.20 mb …   1.29 mb)   1.25 mb ███▄▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▂▁
                  5.36 ipc (  1.72% stalls)  99.04% L1 data cache
          3.66M cycles  19.63M instructions  31.63% retired LD/ST (  6.21M)

• github.com (incognito)
------------------------------------------- -------------------------------
fast-escape-html               1.76 ms/iter   1.76 ms  █▂
                        (1.59 ms … 2.79 ms)   2.71 ms ▄██▃
                    (  1.61 mb …   1.65 mb)   1.61 mb █████▂▁▁▁▁▁▁▁▁▁▁▂▃▂▂▂
                  4.73 ipc (  1.79% stalls)  98.53% L1 data cache
          5.89M cycles  27.90M instructions  30.56% retired LD/ST (  8.53M)

html-escaper                   1.79 ms/iter   1.78 ms  █
                        (1.62 ms … 2.95 ms)   2.85 ms ▄█▄
                    (  1.61 mb …   1.65 mb)   1.61 mb ████▄▂▁▁▁▁▁▁▁▁▁▁▂▂▁▂▂
                  4.76 ipc (  1.76% stalls)  98.52% L1 data cache
          5.99M cycles  28.47M instructions  30.06% retired LD/ST (  8.56M)

lodash.unescape                1.79 ms/iter   1.78 ms  █
                        (1.61 ms … 3.21 ms)   2.82 ms ███▄
                    (  1.61 mb …   1.64 mb)   1.61 mb ████▅▂▂▁▁▁▂▁▁▂▂▂▂▂▁▁▁
                  4.79 ipc (  1.77% stalls)  98.53% L1 data cache
          5.91M cycles  28.34M instructions  30.28% retired LD/ST (  8.58M)

hexo-util                      1.78 ms/iter   1.77 ms  █
                        (1.62 ms … 3.00 ms)   2.76 ms ▅██▃
                    (  1.61 mb …   1.62 mb)   1.61 mb ████▄▃▁▁▁▁▁▁▁▁▁▁▁▂▂▂▁
                  4.79 ipc (  1.75% stalls)  98.54% L1 data cache
          5.95M cycles  28.52M instructions  30.10% retired LD/ST (  8.59M)

unescape                       3.15 ms/iter   3.07 ms  █
                        (2.82 ms … 4.70 ms)   4.58 ms ▃██
                    (  3.15 mb …   3.21 mb)   3.16 mb ████▂▂▁▁▁▁▁▁▁▁▃▁▃▃▃▂▂
                  5.25 ipc (  1.58% stalls)  99.12% L1 data cache
         10.38M cycles  54.51M instructions  30.98% retired LD/ST ( 16.89M)

• stackoverflow.com (incognito)
------------------------------------------- -------------------------------
fast-escape-html               1.71 ms/iter   1.71 ms ▃█
                        (1.55 ms … 3.20 ms)   2.74 ms ██▆▃
                    (  1.48 mb …   1.51 mb)   1.50 mb ████▅▁▁▁▁▁▁▁▁▁▁▂▂▂▁▂▂
                  4.65 ipc (  1.74% stalls)  98.57% L1 data cache
          5.68M cycles  26.44M instructions  30.91% retired LD/ST (  8.17M)

html-escaper                   1.71 ms/iter   1.70 ms █▇
                        (1.58 ms … 2.91 ms)   2.64 ms ██▇
                    (  1.48 mb …   1.52 mb)   1.50 mb ████▄▂▁▁▁▁▁▁▁▁▁▂▁▂▂▂▂
                  4.70 ipc (  1.74% stalls)  98.57% L1 data cache
          5.73M cycles  26.94M instructions  30.46% retired LD/ST (  8.21M)

lodash.unescape                1.70 ms/iter   1.69 ms █▂
                        (1.57 ms … 3.00 ms)   2.70 ms ██▄
                    (  1.48 mb …   1.51 mb)   1.50 mb ███▇▃▂▁▁▁▁▁▁▁▁▁▁▂▂▂▁▁
                  4.72 ipc (  1.74% stalls)  98.57% L1 data cache
          5.69M cycles  26.87M instructions  30.68% retired LD/ST (  8.25M)

hexo-util                      1.76 ms/iter   1.74 ms █▅
                        (1.59 ms … 4.05 ms)   2.98 ms ██▅
                    (  1.48 mb …   1.51 mb)   1.50 mb ███▅▃▂▁▁▁▁▁▂▂▂▂▂▁▁▁▁▁
                  4.67 ipc (  1.69% stalls)  98.58% L1 data cache
          5.80M cycles  27.07M instructions  30.47% retired LD/ST (  8.25M)

unescape                       2.86 ms/iter   2.89 ms ▆█ ▂
                        (2.67 ms … 3.87 ms)   3.60 ms ██▆█▆▂
                    (  2.97 mb …   2.98 mb)   2.97 mb ██████▄▃▂▂▁▁▃▃▃▁▄▂▂▁▁
                  5.25 ipc (  1.60% stalls)  99.13% L1 data cache
          9.56M cycles  50.22M instructions  31.35% retired LD/ST ( 15.75M)

• www.google.com (incognito)
------------------------------------------- -------------------------------
fast-escape-html             775.50 µs/iter 767.25 µs █▃
                      (699.54 µs … 2.03 ms)   1.81 ms ██
                    (829.08 kb … 954.86 kb) 953.04 kb ██▇▃▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                  4.80 ipc (  2.21% stalls)  98.16% L1 data cache
          2.60M cycles  12.48M instructions  29.47% retired LD/ST (  3.68M)

html-escaper                 794.20 µs/iter 795.04 µs ▄█
                      (705.92 µs … 1.90 ms)   1.84 ms ██▃
                    (829.08 kb … 954.80 kb) 952.84 kb ███▄▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                  4.77 ipc (  2.15% stalls)  98.18% L1 data cache
          2.66M cycles  12.67M instructions  29.13% retired LD/ST (  3.69M)

lodash.unescape              786.99 µs/iter 783.17 µs █▆
                      (704.96 µs … 1.98 ms)   1.84 ms ██▂
                    (857.23 kb … 954.80 kb) 953.26 kb ███▃▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                  4.80 ipc (  2.18% stalls)  98.17% L1 data cache
          2.64M cycles  12.68M instructions  29.28% retired LD/ST (  3.71M)

hexo-util                    797.88 µs/iter 789.46 µs █
                      (715.83 µs … 2.07 ms)   1.89 ms ██
                    (829.12 kb … 954.86 kb) 953.08 kb ██▇▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                  4.78 ipc (  2.15% stalls)  98.16% L1 data cache
          2.67M cycles  12.76M instructions  29.10% retired LD/ST (  3.71M)

unescape                       1.43 ms/iter   1.43 ms █▄
                        (1.29 ms … 2.48 ms)   2.41 ms ██▇
                    (  1.46 mb …   1.54 mb)   1.51 mb ████▄▁▁▁▁▁▁▁▁▂▁▁▁▁▂▁▂
                  5.29 ipc (  1.71% stalls)  98.97% L1 data cache
          4.76M cycles  25.18M instructions  29.94% retired LD/ST (  7.54M)

• about.gitlab.com
------------------------------------------- -------------------------------
fast-escape-html               1.41 ms/iter   1.41 ms ▃█
                        (1.28 ms … 2.32 ms)   2.29 ms ██▆▂
                    (  1.54 mb …   1.57 mb)   1.55 mb ████▅▂▁▁▁▁▁▁▁▁▁▂▂▂▂▁▂
                  4.80 ipc (  2.38% stalls)  98.10% L1 data cache
          4.72M cycles  22.67M instructions  29.38% retired LD/ST (  6.66M)

html-escaper                   1.44 ms/iter   1.43 ms ▂█
                        (1.29 ms … 2.88 ms)   2.44 ms ██▇
                    (  1.54 mb …   1.57 mb)   1.55 mb ████▄▂▁▁▁▁▁▁▁▁▁▂▁▂▂▂▁
                  4.81 ipc (  2.35% stalls)  98.08% L1 data cache
          4.82M cycles  23.17M instructions  28.97% retired LD/ST (  6.71M)

lodash.unescape                1.42 ms/iter   1.41 ms ▂█
                        (1.29 ms … 2.44 ms)   2.33 ms ██▅
                    (  1.54 mb …   1.57 mb)   1.55 mb ████▃▂▁▁▁▁▁▁▁▁▁▁▂▂▂▂▁
                  4.83 ipc (  2.37% stalls)  98.10% L1 data cache
          4.77M cycles  23.06M instructions  29.16% retired LD/ST (  6.72M)

hexo-util                      1.43 ms/iter   1.42 ms  █
                        (1.30 ms … 2.59 ms)   2.36 ms ██▃
                    (  1.54 mb …   1.58 mb)   1.55 mb ███▇▂▂▁▁▁▁▁▁▁▁▁▁▂▁▂▁▁
                  4.83 ipc (  2.34% stalls)  98.12% L1 data cache
          4.80M cycles  23.20M instructions  28.99% retired LD/ST (  6.72M)

unescape                       2.64 ms/iter   2.61 ms  █▃
                        (2.38 ms … 4.12 ms)   3.86 ms ▆██▄
                    (  2.73 mb …   2.77 mb)   2.74 mb ████▅▃▁▁▁▁▁▁▁▁▁▂▁▄▂▃▂
                  5.26 ipc (  1.79% stalls)  98.91% L1 data cache
          8.79M cycles  46.25M instructions  29.91% retired LD/ST ( 13.83M)
```
