package billtracker.domain;

import java.math.BigDecimal;
import java.util.Date;

public class Bill {
	Long billId;
	private Merchant merchantName;
	private BigDecimal amount;
	private String serialNumber;
	private Date billDate;
	private Date dueDate;
	
	public Bill() {
		
	}
	
	public Bill(Merchant merchantName, BigDecimal amount, String serialNumber, Date billDate, Date dueDate) {
		this(null, merchantName, amount, serialNumber, billDate, dueDate);
	}

	public Bill(Long billId, Merchant merchantName, BigDecimal amount, String serialNumber, Date billDate, Date dueDate) {
		this.billId = billId;
		this.merchantName = merchantName;
		this.amount = amount;
		this.serialNumber = serialNumber;
		this.billDate = billDate;
		this.dueDate = dueDate;
	}

	public Long getId() {
		return billId;
	}

	public void setId(Long billId) {
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

	public Date getBillDate() {
		return billDate;
	}

	public void setBillDate(Date billDate) {
		this.billDate = billDate;
	}

	public Date getDueDate() {
		return dueDate;
	}

	public void setDueDate(Date dueDate) {
		this.dueDate = dueDate;
	}

	public Merchant getMerchantName() {
		return merchantName;
	}

	public void setMerchantName(Merchant merchantName) {
		this.merchantName = merchantName;
	}
}
	