package com.example.analyzer;

/**
 * Analyzes a list of integers and reports parity statistics.
 */
public class NumberAnalyzer {

    /**
     * Walks through the given numbers (loop), tags each as even/odd (branch),
     * then compares the counts to summarize which parity dominates (branch).
     */
    public String analyze(int[] numbers) {
        StringBuilder pattern = new StringBuilder();
        int evenCount = 0;
        int oddCount = 0;

        for (int number : numbers) {
            if (number % 2 == 0) {
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
