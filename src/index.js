import java.util.ArrayList;
import java.util.List;

public class PowerOfTwoMaxHeap {
    private final int childrenCount;
    private final List<Integer> heap;

    public PowerOfTwoMaxHeap(int childrenCount) {
        this.childrenCount = childrenCount;
        this.heap = new ArrayList<>();
    }

    // Inserts a value into the heap
    public void insert(int value) {
        heap.add(value); // Step 1: Add the new value to the end of the list
        bubbleUp(heap.size() - 1); // Step 2: Bubble up to maintain heap property
    }

    // Bubbles up the value at the specified index to maintain the heap property
    private void bubbleUp(int index) {
        int parentIndex = (index - 1) / childrenCount; // Determine the parent index
        while (index > 0 && heap.get(index) > heap.get(parentIndex)) {
            // Swap if the current value is greater than its parent
            swap(index, parentIndex);
            index = parentIndex; // Move up to the parent's index
            parentIndex = (index - 1) / childrenCount;
        }
    }

    // Removes and returns the maximum value from the heap
    public int popMax() {
        if (heap.isEmpty()) {
            throw new IllegalStateException("Heap is empty");
        }
        int maxValue = heap.get(0); // The max value is at the root
        int lastValue = heap.remove(heap.size() - 1); // Remove the last element
        if (!heap.isEmpty()) {
            heap.set(0, lastValue); // Move the last element to root
            bubbleDown(0); // Bubble down the new root to maintain the heap property
        }
        return maxValue; // Return the max value
    }

    // Bubbles down the value at the specified index to maintain the heap property
    private void bubbleDown(int index) {
        int maxChildIndex;
        while ((maxChildIndex = getMaxChildIndex(index)) != -1) {
            // If the current node is less than the greatest child, swap
            if (heap.get(index) < heap.get(maxChildIndex)) {
                swap(index, maxChildIndex);
                index = maxChildIndex; // Move down to the maximum child
            } else {
                break; // The heap property is satisfied
            }
        }
    }

    // Returns the index of the largest child, or -1 if there are no children
    private int getMaxChildIndex(int index) {
        int firstChildIndex = index * childrenCount + 1;
        int maxChildIndex = -1;

        // Check for multiple children
        for (int i = 0; i < childrenCount; i++) {
            int childIndex = firstChildIndex + i;
            if (childIndex < heap.size()) {
                if (maxChildIndex == -1 || heap.get(childIndex) > heap.get(maxChildIndex)) {
                    maxChildIndex = childIndex; // Update max child index
                }
            } else {
                break; // No more children exist
            }
        }
        return maxChildIndex; // Return the index of the largest child, or -1
    }

    // Swaps values at two indices in the heap
    private void swap(int index1, int index2) {
        int temp = heap.get(index1);
        heap.set(index1, heap.get(index2));
        heap.set(index2, temp);
    }

    // Main method to the PowerofTwoMaxHeap
    public static void main(String[] args) {
        PowerOfTwoMaxHeap heap = new PowerOfTwoMaxHeap(2); // Each parent has 4 children (2^2)
        
        // Test insertion
        heap.insert(10);
        heap.insert(20);
        heap.insert(5);
        heap.insert(30);
        heap.insert(25);

        // Test popMax
        System.out.println(heap.popMax()); // Should print 30
        System.out.println(heap.popMax()); // Should print 25
        System.out.println(heap.popMax()); // Should print 20
        System.out.println(heap.popMax()); // Should print 10
        System.out.println(heap.popMax()); // Should print 5

        // Edge case test: pop from empty heap
        try {
            System.out.println(heap.popMax()); // Should throw exception
        } catch (IllegalStateException e) {
            System.out.println(e.getMessage()); // Expected: Heap is empty
        }
    }
}