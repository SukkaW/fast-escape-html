# fast-escape-html

**Fastest**, zero-dependencies, plain JavaScript, 100% test coverage, HTML escaping library for JavaScript.

Even faster than the Rust-based [`@napi-rs/escape`](https://www.npmjs.com/package/@napi-rs/escape) on Node.js (see realworld benchmark below)!

## Installation

```bash
# Using npm, yarn, or pnpm
npm install fast-escape-html
yarn add fast-escape-html
pnpm add fast-escape-html
```

## Usage

```ts
import { escapeHTML } from 'fast-escape-html';
```

## Benchmark

The benchmark is run using [`mitata`](https://www.npmjs.com/package/mitata) against realworld websites' HTML:

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
# On supported platforms (Linux, macOS), you can use "sudo" to enable hardware counter
sudo pnpm run bench
```

Results follow:

```
clk: ~3.08 GHz
cpu: Apple M2 Max
runtime: node 22.15.1 (arm64-darwin)

benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
• skk.moe
------------------------------------------- -------------------------------
fast-escape-html             232.16 µs/iter 232.96 µs  █
                    (213.21 µs … 678.54 µs) 404.00 µs ██▆
                    ( 27.85 kb … 843.56 kb) 485.34 kb ███▆▄▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                  4.62 ipc (  0.91% stalls)  99.27% L1 data cache
        779.25k cycles   3.60M instructions  21.18% retired LD/ST (763.14k)

escape-html                  238.36 µs/iter 240.25 µs ▇█
                    (218.67 µs … 475.92 µs) 410.46 µs ██▅
                    ( 63.66 kb … 694.84 kb) 484.96 kb ████▅▃▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                  4.51 ipc (  0.92% stalls)  99.21% L1 data cache
        798.45k cycles   3.60M instructions  21.06% retired LD/ST (758.76k)

@napi-rs/escape              258.84 µs/iter 256.58 µs █▅
                      (233.29 µs … 1.12 ms) 798.33 µs ██
                    (128.29 kb … 288.27 kb) 207.77 kb ██▃▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                  4.46 ipc ( 16.99% stalls)  83.26% L1 data cache
        871.52k cycles   3.88M instructions  23.64% retired LD/ST (917.78k)

html-escaper                 398.49 µs/iter 393.75 µs ▄█
                      (356.50 µs … 1.29 ms)   1.13 ms ██
                    (540.52 kb … 598.27 kb) 574.07 kb ██▄▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                  4.12 ipc (  2.92% stalls)  97.81% L1 data cache
          1.34M cycles   5.51M instructions  34.03% retired LD/ST (  1.88M)

lodash.escape                401.68 µs/iter 396.58 µs ▃█
                      (360.42 µs … 1.38 ms)   1.13 ms ██
                    (540.52 kb … 576.36 kb) 574.17 kb ██▃▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                  4.17 ipc (  2.90% stalls)  97.87% L1 data cache
          1.35M cycles   5.63M instructions  34.15% retired LD/ST (  1.92M)

escape-goat                  530.94 µs/iter 514.38 µs  █
                      (462.88 µs … 1.55 ms)   1.34 ms ▅█
                    (  1.22 mb …   1.22 mb)   1.22 mb ██▅▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                  3.49 ipc (  2.86% stalls)  97.48% L1 data cache
          1.78M cycles   6.21M instructions  30.85% retired LD/ST (  1.92M)

• github.com (incognito)
------------------------------------------- -------------------------------
fast-escape-html             785.30 µs/iter 784.13 µs  █▄
                      (728.21 µs … 1.13 ms)   1.08 ms  ██▄
                    (  1.19 mb …   1.19 mb)   1.19 mb ▆███▇▄▂▁▁▁▁▁▁▁▁▂▂▂▂▂▁
                  4.58 ipc (  1.13% stalls)  98.80% L1 data cache
          2.63M cycles  12.05M instructions  20.31% retired LD/ST (  2.45M)

escape-html                  793.97 µs/iter 792.50 µs  █
                      (739.17 µs … 1.24 ms)   1.10 ms  ██
                    (  1.19 mb …   1.19 mb)   1.19 mb ████▅▄▂▁▁▁▁▁▁▁▂▂▂▂▂▁▁
                  4.53 ipc (  1.12% stalls)  98.79% L1 data cache
          2.66M cycles  12.08M instructions  20.18% retired LD/ST (  2.44M)

@napi-rs/escape              947.18 µs/iter 947.54 µs  █▃
                      (820.58 µs … 3.08 ms)   2.03 ms  ██
                    (697.81 kb … 697.81 kb) 697.81 kb ▇██▇▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                  4.60 ipc ( 18.52% stalls)  82.32% L1 data cache
          3.03M cycles  13.95M instructions  23.42% retired LD/ST (  3.27M)

html-escaper                   1.19 ms/iter   1.18 ms  █▃
                        (1.07 ms … 1.92 ms)   1.81 ms  ██▅
                    (  1.37 mb …   1.43 mb)   1.39 mb ▇███▆▂▁▂▂▂▂▂▁▂▁▁▁▁▂▂▁
                  3.89 ipc (  2.50% stalls)  98.00% L1 data cache
          3.97M cycles  15.44M instructions  33.38% retired LD/ST (  5.16M)

lodash.escape                  1.18 ms/iter   1.16 ms  █
                        (1.07 ms … 1.91 ms)   1.82 ms  ██
                    (  1.37 mb …   1.43 mb)   1.39 mb ▇███▄▂▁▁▁▁▁▁▁▁▂▂▂▂▂▁▁
                  3.98 ipc (  2.51% stalls)  98.05% L1 data cache
          3.94M cycles  15.66M instructions  33.63% retired LD/ST (  5.27M)

escape-goat                    1.40 ms/iter   1.38 ms  █▅▂
                        (1.20 ms … 2.26 ms)   2.18 ms  ███
                    (  3.82 mb …   3.82 mb)   3.82 mb █████▅▁▁▁▁▁▂▂▂▂▂▂▂▂▃▂
                  3.47 ipc (  3.33% stalls)  97.22% L1 data cache
          4.69M cycles  16.30M instructions  30.52% retired LD/ST (  4.97M)

• stackoverflow.com (incognito)
------------------------------------------- -------------------------------
fast-escape-html             686.05 µs/iter 680.38 µs  █▂
                      (628.13 µs … 1.05 ms)   1.01 ms  ██▂
                    (  1.18 mb …   1.18 mb)   1.18 mb ████▄▂▁▁▁▁▁▁▁▁▁▁▁▂▃▂▁
                  4.40 ipc (  0.86% stalls)  99.28% L1 data cache
          2.31M cycles  10.16M instructions  21.21% retired LD/ST (  2.15M)

escape-html                  699.20 µs/iter 693.96 µs  █▅
                      (640.37 µs … 1.07 ms)   1.02 ms ▃██▄
                    (  1.18 mb …   1.18 mb)   1.18 mb ████▅▃▂▁▁▁▁▁▁▁▁▁▁▂▃▂▁
                  4.34 ipc (  0.89% stalls)  99.21% L1 data cache
          2.34M cycles  10.18M instructions  21.03% retired LD/ST (  2.14M)

@napi-rs/escape              763.80 µs/iter 781.42 µs    █▃
                      (683.71 µs … 1.31 ms)   1.12 ms  ▂▆██▄
                    (586.23 kb … 586.23 kb) 586.23 kb ▃█████▅▃▂▁▁▁▁▁▁▁▁▁▁▁▁
                  4.43 ipc ( 17.79% stalls)  82.33% L1 data cache
          2.51M cycles  11.10M instructions  23.40% retired LD/ST (  2.60M)

html-escaper                   1.13 ms/iter   1.13 ms  █
                        (1.03 ms … 1.89 ms)   1.76 ms ▃██
                    (  1.23 mb …   1.32 mb)   1.28 mb ████▃▂▁▁▁▁▂▂▁▁▁▁▁▂▁▁▁
                  3.83 ipc (  2.42% stalls)  98.07% L1 data cache
          3.78M cycles  14.47M instructions  33.57% retired LD/ST (  4.86M)

lodash.escape                  1.13 ms/iter   1.12 ms  █▃
                        (1.03 ms … 1.93 ms)   1.81 ms  ██
                    (  1.26 mb …   1.32 mb)   1.28 mb ███▇▃▁▁▁▁▁▁▁▁▂▁▁▁▂▁▂▁
                  3.88 ipc (  2.42% stalls)  98.11% L1 data cache
          3.79M cycles  14.72M instructions  33.78% retired LD/ST (  4.97M)

escape-goat                    1.32 ms/iter   1.27 ms  █
                        (1.11 ms … 2.51 ms)   2.26 ms  ██
                    (  3.30 mb …   3.30 mb)   3.30 mb ▅██▇▃▂▁▁▁▁▁▁▁▂▂▁▂▂▂▂▂
                  3.45 ipc (  2.78% stalls)  97.71% L1 data cache
          4.41M cycles  15.22M instructions  31.34% retired LD/ST (  4.77M)

• www.google.com (incognito)
------------------------------------------- -------------------------------
fast-escape-html             408.12 µs/iter 409.88 µs  █
                    (380.38 µs … 751.46 µs) 659.46 µs ▅█▆
                    (513.24 kb … 513.29 kb) 513.27 kb ███▇▃▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                  4.75 ipc (  0.87% stalls)  98.96% L1 data cache
          1.37M cycles   6.52M instructions  19.21% retired LD/ST (  1.25M)

escape-html                  413.83 µs/iter 416.63 µs  █
                    (385.71 µs … 734.54 µs) 657.67 µs ▆█▇
                    (513.24 kb … 513.29 kb) 513.27 kb ████▄▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                  4.71 ipc (  0.86% stalls)  98.96% L1 data cache
          1.39M cycles   6.53M instructions  19.09% retired LD/ST (  1.25M)

@napi-rs/escape              459.53 µs/iter 482.21 µs  ▄█▃
                      (402.38 µs … 1.20 ms) 561.46 µs  ████▆▄▇▅▄▅ ▂
                    (390.04 kb … 390.05 kb) 390.05 kb ▆█████████████▅▆▃▃▂▂▁
                  4.57 ipc ( 16.56% stalls)  82.73% L1 data cache
          1.51M cycles   6.91M instructions  22.03% retired LD/ST (  1.52M)

html-escaper                 526.24 µs/iter 519.75 µs  █
                      (468.33 µs … 1.18 ms) 939.88 µs ▂█▅
                    (702.72 kb … 761.38 kb) 758.76 kb ███▆▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                  4.00 ipc (  3.05% stalls)  97.56% L1 data cache
          1.76M cycles   7.05M instructions  33.22% retired LD/ST (  2.34M)

lodash.escape                532.46 µs/iter 526.42 µs  █
                      (473.00 µs … 1.45 ms)   1.23 ms ▃█
                    (745.70 kb … 825.25 kb) 760.77 kb ██▇▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                  4.04 ipc (  2.98% stalls)  97.65% L1 data cache
          1.78M cycles   7.18M instructions  33.42% retired LD/ST (  2.40M)

escape-goat                  680.58 µs/iter 663.46 µs  █
                      (569.46 µs … 1.54 ms)   1.41 ms ▂█▆
                    (  1.75 mb …   2.20 mb)   1.97 mb ███▇▂▁▁▁▁▁▁▁▁▁▂▂▁▂▁▁▁
                  3.26 ipc (  4.67% stalls)  95.01% L1 data cache
          2.29M cycles   7.47M instructions  29.19% retired LD/ST (  2.18M)
```
