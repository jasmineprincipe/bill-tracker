package billtracker.dao;

import billtracker.domain.Bill;
import java.util.List;

public interface BillDao {
	
	public List<Bill> findAll();
	
	public Bill find(Long id);
	
	public List<Bill> findByName(String merchantName);
	
	public void add(Bill merchant);
	
	public void update(Bill merchant);
	
	public void delete(Long id);

}
