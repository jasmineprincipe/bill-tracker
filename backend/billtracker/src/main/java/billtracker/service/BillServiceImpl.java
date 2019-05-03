package billtracker.service;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import billtracker.dao.BillDao;
import billtracker.dao.JdbcDaoImpl;
import billtracker.domain.Bill;

public class BillServiceImpl implements BillService{
	
	BillDao billDao;

	public BillServiceImpl() {
		this.billDao = JdbcDaoImpl.getInstance();
	}
	
	@Override
	public List<Bill> findAllBills() {
		return billDao.findAllBills();
	}
	
	@Override
	public List<Bill> findCurrentBills() {
		return billDao.findCurrentBills();
	}
	
	@Override
	public List<Bill> findBillHistory() {
		return billDao.findBillHistory();
	}

	@Override
	public Bill findBill(Long billId) {
		return billDao.findBill(billId);
	}

	@Override
	public List<Bill> findByMerchant(String merchantName) {
		return billDao.findByMerchant(merchantName);
	}
	
	@Override
	public List<Bill> findByMonth(String billMonth, String billYear) {
		return billDao.findByMonth(billMonth, billYear);
	}

	@Override
	public void add(Bill bill) {
		if (validate(bill)) {
			billDao.add(bill);
		} else {
			throw new IllegalArgumentException("Merchant cannot be blank.");
		}
	}

	@Override
	public void upsert(Bill bill) {
		if (validate(bill)) {
			if(bill.getBillId() != null && bill.getBillId() >= 0) {
				billDao.update(bill);
			} else {
				billDao.add(bill);
			}
		} else {
			throw new IllegalArgumentException("Merchant cannot be blank.");
		}
	}

	@Override
	public void deleteBill(Long billId) {
		billDao.deleteBill(billId);
	}
	
	private boolean validate(Bill bill) {
		return !StringUtils.isAnyBlank(bill.getSerialNumber(), bill.getMerchantName());
	}

}
