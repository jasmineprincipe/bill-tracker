package billtracker.domain;

import java.math.BigDecimal;

public class History {

	Long monthDue;
	BigDecimal totalAmount;
	
	public History() {
		
	}
	
	public History(Long monthDue, BigDecimal totalAmount) {
		this.monthDue = monthDue;
		this.totalAmount = totalAmount;
	}

	public Long getMonthDue() {
		return monthDue;
	}

	public void setMonthDue(Long monthDue) {
		this.monthDue = monthDue;
	}

	public BigDecimal getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(BigDecimal totalAmount) {
		this.totalAmount = totalAmount;
	}

}
