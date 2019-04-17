package billtracker.domain;

import java.math.BigDecimal;
import java.util.Date;

public class Bill {
	Long id;
	private BigDecimal amount;
	private String serialNumber;
	private Date billDate;
	private Date dueDate;
	
	public Bill() {
		
	}
	
	public Bill(BigDecimal amount, String serialNumber, Date billDate, Date dueDate) {
		this(null, amount, serialNumber, billDate, dueDate);
	}

	public Bill(Long id, BigDecimal amount, String serialNumber, Date billDate, Date dueDate) {
		this.id = id;
		this.amount = amount;
		this.serialNumber = serialNumber;
		this.billDate = billDate;
		this.dueDate = dueDate;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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
}
	