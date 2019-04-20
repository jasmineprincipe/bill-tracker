package billtracker.dao;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.hsqldb.jdbc.JDBCDataSource;

import billtracker.domain.Bill;
import billtracker.domain.Merchant;

public class BillJdbcDaoImpl implements BillDao {

	private static BillJdbcDaoImpl INSTANCE;

	private JDBCDataSource dataSource;

	static public BillJdbcDaoImpl getInstance() {

		BillJdbcDaoImpl instance;
		if (INSTANCE != null) {
			instance = INSTANCE;
		} else {
			instance = new BillJdbcDaoImpl();
			INSTANCE = instance;
		}

		return instance;
	}

	private BillJdbcDaoImpl() {
		init();
	}

	private void init() {
		dataSource = new JDBCDataSource();
		dataSource.setDatabase("jdbc:hsqldb:mem:BILL");
		dataSource.setUser("username");
		dataSource.setPassword("password");

		createBillTable();
//		insertInitBills();

	}

	private void createBillTable() {
		String createSql = "CREATE TABLE BILLS " + "(bill_id INTEGER IDENTITY PRIMARY KEY, " 
				+ "merchant_name VARCHAR(255) FOREIGN KEY REFERENCES MERCHANTS(merchant_name), "
				+ "amount DOUBLE, " 
				+ "serial_number VARCHAR(12), " 
				+ "bill_date DATE,"
				+ "due_date DATE)";

		try (Connection conn = dataSource.getConnection(); Statement stmt = conn.createStatement()) {

			stmt.executeUpdate(createSql);

		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
	}

//	private void insertInitBills() {

//		Bill merchant;
//		add(new Bill(merchant.getMerchantName(), 1200, "12dkf3e", 2009-12-12, 2010-01-23));
//	}

	@Override
	public List<Bill> findAll() {

		return findByMerchant(null);
	}

	@Override
	public Bill find(Long billId) {

		Bill bill = null;

		if (billId != null) {
			String sql = "SELECT bills.bill_id, merchants.merchant_name, bills.amount, bills.serial_number, bills.bill_date, bills.due_date "
					+ "	FROM BILLS LEFT JOIN MERCHANTS ON bills.merchant_name = merchants.merchant_name";
			try (Connection conn = dataSource.getConnection(); PreparedStatement ps = conn.prepareStatement(sql)) {

				ps.setInt(1, billId.intValue());
				ResultSet results = ps.executeQuery();

				if (results.next()) {
					bill = new Bill();
				}

			} catch (SQLException e) {
				e.printStackTrace();
				throw new RuntimeException(e);
			}
		}

		return bill;
	}

	@Override
	public List<Bill> findByMerchant(Merchant merchantName) {
		List<Bill> bills = new ArrayList<>();

		String sql = "SELECT bills.bill_id, merchants.merchant_name, bills.amount, bills.serial_number, bills.bill_date, bills.due_date "
				+ "FROM BILLS LEFT JOIN MERCHANTS ON bills.merchant_name = merchants.merchant_name";

		try (Connection conn = dataSource.getConnection(); PreparedStatement ps = conn.prepareStatement(sql)) {

			ps.setString(1, createSearchValue(merchantName));
			
			ResultSet results = ps.executeQuery();
			
			while (results.next()) {
				Bill bill = new Bill();
				bills.add(bill);
			}

		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}

		return bills;
	}

	private String createSearchValue(Merchant merchantName) {
		
		String value;
		
		if (StringUtils.isBlank(merchantName.toString())) {
			value = "%";
		} else {
			value = merchantName.toString();
		}
		
		return value;
	}
	
	@Override
	public void add(Bill bill) {
		
		String insertSql = "INSERT INTO BILLS (merchant_name, amount, serial_number, bill_date, due_date) VALUES (?,?,?,?,?)";

		try (Connection conn = dataSource.getConnection(); PreparedStatement ps = conn.prepareStatement(insertSql)) {

			ps.setString(1, bill.getMerchantName().toString());
			ps.setBigDecimal(2, bill.getAmount());
			ps.setString(3, bill.getSerialNumber());
			ps.setDate(4, (Date) bill.getBillDate());
			ps.setDate(5, (Date) bill.getDueDate());
			ps.executeUpdate();

		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
	}

	@Override
	public void update(Bill bill) {
		String updateSql = "UPDATE BILLS SET merchant_name = ?, amount = ?, serial_number, bill_date = ?, due_date = ? WHERE bill_id = ?";

		try (Connection conn = dataSource.getConnection(); PreparedStatement ps = conn.prepareStatement(updateSql)) {

			ps.setString(1, bill.getMerchantName().toString());
			ps.setBigDecimal(2, bill.getAmount());
			ps.setString(3, bill.getSerialNumber());
			ps.setDate(4, (Date) bill.getBillDate());
			ps.setDate(5, (Date) bill.getDueDate());
			ps.executeUpdate();

		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
	}

	@Override
	public void delete(Long id) {
		String updateSql = "DELETE FROM BILLS WHERE bill_id = ?";

		try (Connection conn = dataSource.getConnection(); PreparedStatement ps = conn.prepareStatement(updateSql)) {

			ps.setLong(1, id);
			ps.executeUpdate();

		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
	}

}
