package billtracker.service;

import java.util.List;

import billtracker.domain.Bill;

public interface BillService {

	public List<Bill> findAllBills();
	
	public Bill findBill(Long billId);
	
	public List<Bill> findByMerchant(String merchantName);
	
	public List<Bill> findByMonth(String dueDate);
	
	public void add(Bill bill);
	
	public void upsert(Bill bill);
	
	public void deleteBill(Long billId);
}
