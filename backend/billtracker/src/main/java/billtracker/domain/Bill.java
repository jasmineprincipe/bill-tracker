package billtracker.domain;

import java.math.BigDecimal;

public class Bill {
	Long billId;
	private String merchantName;
	private BigDecimal amount;
	private String serialNumber;
	private String billDate;
	private String dueDate;
	
	public Bill() {
		
	}
	
	public Bill(String merchantName, BigDecimal amount, String serialNumber, String billDate, String dueDate) {
		this(null, merchantName, amount, serialNumber, billDate, dueDate);
	}

	public Bill(Long billId, String merchantName, BigDecimal amount, String serialNumber, String billDate, String dueDate) {
		this.billId = billId;
		this.merchantName = merchantName;
		this.amount = amount;
		this.serialNumber = serialNumber;
		this.billDate = billDate;
		this.dueDate = dueDate;
	}

	public Long getBillId() {
		return billId;
	}

	public void setBillId(Long billId) {
		this.billId = billId;
	}

	public BigDecimal getAmount() {
		return amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	public String getSerialNumber() {
		return serialNumber;
	}

	public void setSerialNumber(String serialNumber) {
		this.serialNumber = serialNumber;
	}

	public String getBillDate() {
		return billDate;
	}

	public void setBillDate(String billDate) {
		this.billDate = billDate;
	}

	public String getDueDate() {
		return dueDate;
	}

	public void setDueDate(String dueDate) {
		this.dueDate = dueDate;
	}

	public String getMerchantName() {
		return merchantName;
	}

	public void setMerchantName(String merchantName) {
		this.merchantName = merchantName;
	}
}
	