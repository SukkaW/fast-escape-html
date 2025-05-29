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
clk: ~3.01 GHz
cpu: Apple M2 Max
runtime: node 22.15.1 (arm64-darwin)

benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
• skk.moe
------------------------------------------- -------------------------------
fast-escape-html             240.10 µs/iter 234.50 µs ██
                      (213.21 µs … 1.07 ms) 487.38 µs ██
                    (107.52 kb … 843.56 kb) 485.42 kb ██▇▄▃▂▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁

escape-html                  233.85 µs/iter 233.96 µs ▂█
                    (218.50 µs … 511.21 µs) 377.38 µs ██▄
                    ( 63.63 kb … 711.84 kb) 484.92 kb ███▆▃▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁

@napi-rs/escape              252.24 µs/iter 250.92 µs ██
                      (231.75 µs … 1.56 ms) 609.38 µs ██
                    (207.75 kb … 207.77 kb) 207.77 kb ██▅▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁

html-escaper                 388.08 µs/iter 381.96 µs ▅█
                      (353.79 µs … 1.42 ms) 874.79 µs ██
                    (540.52 kb … 576.24 kb) 574.08 kb ██▅▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁

lodash.escape                389.20 µs/iter 386.38 µs ▃█
                      (357.13 µs … 1.18 ms) 895.54 µs ██
                    (540.52 kb … 598.29 kb) 574.13 kb ██▅▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁

escape-goat                  526.43 µs/iter 505.25 µs  █
                      (459.50 µs … 2.85 ms)   1.17 ms ▆█
                    (  1.22 mb …   1.22 mb)   1.22 mb ██▆▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁

• github.com (incognito)
------------------------------------------- -------------------------------
fast-escape-html             775.54 µs/iter 774.00 µs  █
                      (727.21 µs … 1.24 ms)   1.05 ms ██▇
                    (  1.19 mb …   1.19 mb)   1.19 mb ████▄▃▂▁▁▁▁▁▁▂▂▂▁▁▂▁▁

escape-html                  791.52 µs/iter 789.17 µs ▂█▄
                      (743.42 µs … 1.21 ms)   1.05 ms ███▄
                    (  1.19 mb …   1.19 mb)   1.19 mb ████▆▃▃▂▂▂▁▁▁▂▂▂▂▂▂▂▁

@napi-rs/escape              929.73 µs/iter 932.88 µs  █
                      (811.29 µs … 3.69 ms)   2.07 ms  ██
                    (697.81 kb … 697.81 kb) 697.81 kb ███▅▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁

html-escaper                   1.15 ms/iter   1.15 ms  █▄
                        (1.06 ms … 1.95 ms)   1.62 ms ▂██
                    (  1.37 mb …   1.43 mb)   1.39 mb ████▅▃▃▂▁▂▂▁▁▂▂▂▂▁▁▁▁

lodash.escape                  1.14 ms/iter   1.13 ms  █▅
                        (1.06 ms … 1.72 ms)   1.62 ms  ██
                    (  1.37 mb …   1.43 mb)   1.39 mb ████▃▂▁▂▁▁▁▁▂▂▂▂▁▁▁▁▁

escape-goat                    1.40 ms/iter   1.35 ms  █
                        (1.19 ms … 3.66 ms)   2.58 ms  █
                    (  3.82 mb …   3.82 mb)   3.82 mb ███▂▂▁▂▂▂▃▂▂▂▁▁▁▁▁▁▁▁

• stackoverflow.com (incognito)
------------------------------------------- -------------------------------
fast-escape-html             676.05 µs/iter 667.96 µs  █
                      (628.54 µs … 1.03 ms) 981.58 µs ███
                    (  1.18 mb …   1.18 mb)   1.18 mb ███▇▃▂▁▁▁▁▁▁▁▁▁▁▂▂▂▂▂

escape-html                  699.23 µs/iter 694.79 µs ▃█▆
                      (643.38 µs … 1.11 ms)   1.04 ms ███▃
                    (  1.18 mb …   1.18 mb)   1.18 mb ████▅▂▁▁▁▁▁▁▁▁▁▂▂▃▂▂▁

@napi-rs/escape              797.89 µs/iter 793.25 µs  ▃█
                      (679.50 µs … 2.51 ms)   1.76 ms ▂██
                    (586.23 kb … 586.23 kb) 586.23 kb ███▆▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁

html-escaper                   1.13 ms/iter   1.12 ms  █
                        (1.02 ms … 1.95 ms)   1.70 ms ██▆▂
                    (  1.23 mb …   1.32 mb)   1.28 mb ████▄▃▂▁▁▂▁▂▂▂▂▂▂▁▁▁▁

lodash.escape                  1.11 ms/iter   1.11 ms  █
                        (1.02 ms … 1.87 ms)   1.70 ms ██▇▂
                    (  1.26 mb …   1.32 mb)   1.28 mb ████▃▂▁▁▁▁▁▁▁▂▂▂▁▁▁▁▁

escape-goat                    1.28 ms/iter   1.23 ms ▃█
                        (1.10 ms … 3.69 ms)   2.28 ms ██
                    (  3.30 mb …   3.30 mb)   3.30 mb ███▃▂▁▁▁▁▁▂▃▂▂▂▁▁▁▁▁▁

• www.google.com (incognito)
------------------------------------------- -------------------------------
fast-escape-html             399.09 µs/iter 399.21 µs █▄
                    (379.87 µs … 688.54 µs) 608.25 µs ██▂
                    (513.24 kb … 513.29 kb) 513.27 kb ███▄▂▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁

escape-html                  406.16 µs/iter 406.50 µs █▅
                    (386.50 µs … 679.58 µs) 607.38 µs ██▂
                    (513.24 kb … 513.29 kb) 513.27 kb ███▅▃▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁

@napi-rs/escape              458.32 µs/iter 470.00 µs ▂█
                      (400.46 µs … 1.54 ms) 968.54 µs ██▇▃
                    (390.05 kb … 390.05 kb) 390.05 kb ████▄▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁

html-escaper                 508.47 µs/iter 505.88 µs  █
                      (464.54 µs … 1.07 ms) 844.92 µs ▇█▄
                    (721.21 kb … 761.35 kb) 758.76 kb ███▅▃▂▁▁▁▁▂▂▁▂▁▁▁▁▁▁▁

lodash.escape                513.51 µs/iter 511.96 µs  █
                      (469.21 µs … 1.20 ms) 942.96 µs ▅█▃
                    (733.70 kb … 791.47 kb) 760.68 kb ███▄▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁

escape-goat                  667.42 µs/iter 645.13 µs  █
                      (568.54 µs … 2.35 ms)   1.41 ms ▃█
                    (  1.75 mb …   2.20 mb)   1.97 mb ███▃▂▁▁▂▂▂▂▂▂▁▁▁▁▁▁▁▁
```
