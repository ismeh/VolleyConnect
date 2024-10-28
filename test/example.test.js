// Write a suit of example tests
describe('Example', () => {
    it('should be true', () => {
        expect(true).toBe(true);
    });
    it('should be false', () => {
        expect(false).toBe(false);
    });
    it('should be null', () => {
        expect(null).toBeNull();
    });
    it('should be undefined', () => {
        expect(undefined).toBeUndefined();
    });
    it('should be defined', () => {
        expect(1).toBeDefined();
    });
    it('should be truthy', () => {
        expect(true).toBeTruthy();
    });
    it('should be falsy', () => {
        expect(false).toBeFalsy();
    });
    it('should be greater than', () => {
        expect(10).toBeGreaterThan(5);
    });
    it('should be less than', () => {
        expect(5).toBeLessThan(10);
    });
    it('should be greater than or equal', () => {
        expect(10).toBeGreaterThanOrEqual(10);
    });
    it('should be less than or equal', () => {
        expect(5).toBeLessThanOrEqual(5);
    });
    it('should be close to', () => {
        expect(0.3 + 0.3).toBeCloseTo(0.6);
    });
    it('should be a null', () => {
        expect(null).toBeNull();
    });
    it('should be a undefined', () => {
        expect(undefined).toBeUndefined();
    });
    it('should be a NaN', () => {
        expect(NaN).toBeNaN();
    });
    it('should be a truthy', () => {
        expect(1).toBeTruthy();
    });
    it('should be a falsy', () => {
        expect(0).toBeFalsy();
    });
    it('should be a instance', () => {
        expect(new Date()).toBeInstanceOf(Date);
    });
    it('should be a match', () => {
        expect('string').toMatch(/string/);
    });
    it('should be a length', () => {
        expect('string').toHaveLength(6);
    });
    it('should be a contain', () => {
        expect('string').toContain('str');
    });
    it('should be a snapshot', () => {
        expect({ key: 'value' }).toMatchSnapshot();
    });
    it('should be a snapshot', () => {
        expect({ key: 'value' }).toMatchInlineSnapshot(`
{
  "key": "value",
}
`);
    });
    
});