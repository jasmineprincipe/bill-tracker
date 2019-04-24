package billtracker.dao;

import billtracker.domain.Bill;

import java.util.List;

public interface BillDao {
	
	public List<Bill> findAllBills();
	
	public Bill findBill(Long billId);
	
	public List<Bill> findByMerchant(String merchantName);
	
	public void add(Bill bill);
	
	public void update(Bill bill);
	
	public void deleteBill(Long billId);

}
