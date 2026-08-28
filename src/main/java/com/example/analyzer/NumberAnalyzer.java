package com.example.analyzer;

/**
 * Analyzes an integer range [1, n] and reports parity statistics.
 */
public class NumberAnalyzer {

    /**
     * Walks through 1..n (loop), tags each number as even/odd (branch),
     * then compares the counts to summarize which parity dominates (branch).
     */
    public String analyze(int n) {
        StringBuilder pattern = new StringBuilder();
        int evenCount = 0;
        int oddCount = 0;

        for (int i = 1; i <= n; i++) {
            if (i % 2 == 0) {
                evenCount++;
                pattern.append('E');
            } else {
                oddCount++;
                pattern.append('O');
            }
        }

        String summary;
        if (evenCount > oddCount) {
            summary = "MORE_EVEN";
        } else if (oddCount > evenCount) {
            summary = "MORE_ODD";
        } else {
            summary = "EQUAL";
        }

        return pattern + ":" + summary;
    }
}
