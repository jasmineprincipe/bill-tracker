package billtracker.service;

import java.util.List;

import billtracker.domain.Bill;

public interface BillService {

	public List<Bill> findAllBills();
	
	public List<Bill> findCurrentBills();
	
	public List<Bill> findBillHistory();
	
	public Bill findBill(Long billId);
	
	public List<Bill> findByMerchant(String merchantName);
	
	public List<Bill> findByMonth(String billMonth, String billYear);
	
	public void add(Bill bill);
	
	public void upsert(Bill bill);
	
	public void deleteBill(Long billId);
}
