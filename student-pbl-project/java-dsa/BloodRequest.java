/**
 * Represents a single blood distribution request.
 * Used with LinkedList, Stack, Queue, and HashMap in BloodDistributionDSA.
 */
public class BloodRequest {
    private String bloodGroup;
    private String units;
    private String hospital;

    public BloodRequest(String bloodGroup, String units, String hospital) {
        this.bloodGroup = bloodGroup;
        this.units = units;
        this.hospital = hospital;
    }

    public String getBloodGroup() {
        return bloodGroup;
    }

    public String getUnits() {
        return units;
    }

    public String getHospital() {
        return hospital;
    }

    @Override
    public String toString() {
        return bloodGroup + " | " + units + " units | " + hospital;
    }
}
