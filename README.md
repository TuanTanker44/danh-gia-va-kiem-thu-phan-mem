# Number Analyzer

Chương trình Java đơn giản dùng để minh họa kiểm thử statement coverage và path coverage.

## Chương trình

`NumberAnalyzer.analyze(int[] numbers)` ([src/main/java/com/example/analyzer/NumberAnalyzer.java](src/main/java/com/example/analyzer/NumberAnalyzer.java)):

- Có **1 vòng lặp** `for (number : numbers)` để duyệt qua mảng số.
- Có **rẽ nhánh** `if/else` bên trong vòng lặp để phân loại số chẵn/lẻ.
- Có **rẽ nhánh** `if/else if/else` sau vòng lặp để so sánh số lượng chẵn/lẻ (MORE_EVEN / MORE_ODD / EQUAL).

## Chạy chương trình

```bash
mvn -q compile exec:java -Dexec.mainClass=com.example.analyzer.Main
```

## Chạy test

```bash
mvn test
```

## Ghi chú

Dự án này được phát triển theo quy trình:

1. Viết chương trình, chạy thử, commit.
2. Issue #1: viết JUnit test bao phủ tất cả các lệnh (statement coverage).
3. Issue #2: viết JUnit test bao phủ tất cả các đường đi (path coverage).
