/**
 * Rapid Care Blood Distribution - DSA in Java
 * Uses: LinkedList, Stack, Queue, HashMap (Hashing)
 * Run: javac BloodRequest.java BloodDistributionDSA.java && java BloodDistributionDSA
 */

import java.util.*;

public class BloodDistributionDSA {

    private static LinkedList<BloodRequest> requestList = new LinkedList<>();
    private static Stack<BloodRequest> undoStack = new Stack<>();
    private static Queue<BloodRequest> processQueue = new LinkedList<>();
    private static HashMap<String, LinkedList<BloodRequest>> requestsByBloodGroup = new HashMap<>();
    private static Scanner sc = new Scanner(System.in);

    public static void main(String[] args) {
        System.out.println("============================================");
        System.out.println("  Rapid Care - Blood Distribution (Java)  ");
        System.out.println("  DSA: LinkedList, Stack, Queue, Hashing    ");
        System.out.println("============================================\n");

        while (true) {
            printMenu();
            int choice = readInt("Enter choice: ");
            switch (choice) {
                case 1 -> addRequest();
                case 2 -> undoLast();
                case 3 -> processNext();
                case 4 -> displayList();
                case 5 -> searchRequest();
                case 6 -> displayByBloodGroup();
                case 7 -> {
                    System.out.println("Exiting. Thank you!");
                    return;
                }
                default -> System.out.println("Invalid choice. Try 1-7.");
            }
            System.out.println();
        }
    }

    private static void printMenu() {
        System.out.println("1. Add Request       (LinkedList + Stack + Queue + HashMap)");
        System.out.println("2. Undo Last         (Stack - LIFO)");
        System.out.println("3. Process Next      (Queue - FIFO)");
        System.out.println("4. Display All       (LinkedList)");
        System.out.println("5. Search Request    (Linear search on LinkedList)");
        System.out.println("6. Group by Blood    (Hashing - HashMap)");
        System.out.println("7. Exit");
    }

    private static void addRequest() {
        System.out.print("Blood Group (e.g. A+, B-): ");
        String bg = sc.nextLine().trim();
        System.out.print("Units: ");
        String units = sc.nextLine().trim();
        System.out.print("Hospital/Location: ");
        String hospital = sc.nextLine().trim();
        if (bg.isEmpty() || units.isEmpty() || hospital.isEmpty()) {
            System.out.println("All fields required. Not added.");
            return;
        }
        BloodRequest req = new BloodRequest(bg, units, hospital);
        requestList.add(req);
        undoStack.push(req);
        processQueue.offer(req);
        requestsByBloodGroup.putIfAbsent(bg, new LinkedList<>());
        requestsByBloodGroup.get(bg).add(req);
        System.out.println("[LinkedList] Added. [Stack] Pushed. [Queue] Added. [HashMap] Grouped by " + bg);
        System.out.println("Added: " + req);
    }

    private static void undoLast() {
        if (undoStack.isEmpty()) {
            System.out.println("[Stack] Nothing to undo.");
            return;
        }
        BloodRequest last = undoStack.pop();
        requestList.remove(last);
        String bg = last.getBloodGroup();
        if (requestsByBloodGroup.containsKey(bg)) {
            requestsByBloodGroup.get(bg).remove(last);
            if (requestsByBloodGroup.get(bg).isEmpty())
                requestsByBloodGroup.remove(bg);
        }
        System.out.println("[Stack] Undo (LIFO): Removed -> " + last);
    }

    private static void processNext() {
        if (processQueue.isEmpty()) {
            System.out.println("[Queue] No request in queue.");
            return;
        }
        BloodRequest next = processQueue.poll();
        requestList.remove(next);
        String bg = next.getBloodGroup();
        if (requestsByBloodGroup.containsKey(bg)) {
            requestsByBloodGroup.get(bg).remove(next);
            if (requestsByBloodGroup.get(bg).isEmpty())
                requestsByBloodGroup.remove(bg);
        }
        System.out.println("[Queue] Process Next (FIFO): Processed -> " + next);
    }

    private static void displayList() {
        if (requestList.isEmpty()) {
            System.out.println("[LinkedList] No requests.");
            return;
        }
        System.out.println("[LinkedList] All requests (" + requestList.size() + "):");
        for (int i = 0; i < requestList.size(); i++)
            System.out.println("  " + (i + 1) + ". " + requestList.get(i));
    }

    private static void searchRequest() {
        System.out.print("Search by blood group, hospital, or units: ");
        String key = sc.nextLine().trim().toLowerCase();
        if (key.isEmpty()) return;
        for (int i = 0; i < requestList.size(); i++) {
            BloodRequest r = requestList.get(i);
            if (r.toString().toLowerCase().contains(key)) {
                System.out.println("Found at position " + (i + 1) + ": " + r);
                return;
            }
        }
        System.out.println("No request found for: " + key);
    }

    private static void displayByBloodGroup() {
        if (requestsByBloodGroup.isEmpty()) {
            System.out.println("[HashMap] No data. Add requests first.");
            return;
        }
        System.out.println("[HashMap - Hashing] Grouped by Blood Group:");
        for (Map.Entry<String, LinkedList<BloodRequest>> e : requestsByBloodGroup.entrySet()) {
            System.out.println("  " + e.getKey() + " (" + e.getValue().size() + "):");
            for (BloodRequest r : e.getValue())
                System.out.println("    - " + r);
        }
    }

    private static int readInt(String prompt) {
        System.out.print(prompt);
        try {
            return Integer.parseInt(sc.nextLine().trim());
        } catch (NumberFormatException e) {
            return -1;
        }
    }
}
